const db = require('../../../data/data')
const lgQueries = require('./loginQueries')

const validateUserByEmail = async (req, res, next) =>{
  try {
    const {email} = req.body
    /**
     * check if user exsists with given email
     */
    const { rows } = await db.query(lgQueries.validateEmail, [email])
    
    if (rows[0].length <= 0) {
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
  try {

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

const redirectTo = (req, res) => {
  res.redirect('/dashboard.html')
}

module.exports= {
  validateUser,
  validateUserByEmail,
  redirectTo
}