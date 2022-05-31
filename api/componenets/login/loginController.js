
const db = require('../../../data/data')

const lgQueries = require('./loginQueries')

// const {response}= require('express')
// response.redirect()


const validateUserByEmail = async (req, res, next) =>{
  const customHeader = req.get('X-Custom-Header')

  if(customHeader === 'RegisterUserForm') return next();
  try {
    const {email} = req.body
    console.log('verify by email try block')
    /**
     * check if user exsists with given email
     */
    const { rows } = await db.query(lgQueries.validateEmail, [email])
    if (rows.length <= 0) {
      return res.status(400).json(
        {
          message: `No user exsist with the email ${email} would you like to register?`
        });
    } else {
      next();
    }
  } catch (error) {

    if(error) throw error

  }
}

const validateUser = async (req, res, next) => {
  const customHeader = req.get('X-Custom-Header')
  if(customHeader === 'RegisterUserForm') return next();
  try {
    console.log('validetryblock')

    const {email, password} = req.body;

    const { rows } = await db.query(lgQueries.validateUser, [email, password])

    if(email === rows[0].email && password === rows[0].user_password){

      next();

    } else {
      res.status(400).json({message: `Password for ${email} is incorrect. Please try again.` })
    }
    
  } catch (error) {
    if(error) throw error
  }
     
} 
const createUser = async (req, res, next) => {
  const customHeader = req.get('X-Custom-Header')
if(customHeader !== 'RegisterUserForm') return next();


const {firstName, lastName, email, password} = req.body
console.log('create user req body', req.body)
try {
  const client = await db.connect();
  const create = await client.query(lgQueries.createUser, [firstName, lastName, email, password]);
  console.log(create)
  next();
} catch (error) {
  if(error) throw error
}

}

const redirectTo = async (req, res) => {
const {email, password} = req.body
  try {
    console.log('redirectto try')
    const client = await db.connect();
    const { rows } = await client.query(lgQueries.getUserIdByEmailNdPsswrd, [email, password])

    console.log('redirectto query at 0', rows[0])
    const id = rows[0].user_id
    
    
    res.cookie('user', `${id}`).redirect('/dashboard.html')
  } catch (error) {
    if (error) console.log(error)
  }
}
const updateUser = async (req, res) => {
  try {
    const {F_name, L_name, email, user_password} = req.body
    let keys = Object.keys(req.body)
    let setStr = 'UPDATE SET '
    let idStr = ' WHERE user_id = $5;'

    keys.forEach((ele, i) => {
      let propNameAndVar = `${ele}=$${i+1}`
      setStr += `${propNameAndVar}`
    });
    
    const queryStr =`${setStr}${idStr}`
    const client = await db.connect()
    await client.query(queryStr)

    const {rows} = db.query(lgQueries.getUserIdByEmailNdPsswrd, [email, user_password])
    
    next();
      
  } catch (error) {
    if(error) console.log(error)  
  }
}
const removeUser = async (req, res) => {
  const {email} = req.body

  try {
    const client = await db.connect()
    const {rows} = await client.query(lgQueries.deleteUser, [email])
    res.json({message:"User Deleted"})
  } catch (error) {
    if (error) console.log(error)
  }
}

module.exports= {
  validateUser,
  validateUserByEmail,
  redirectTo,
  createUser,
  removeUser,
  updateUser
}