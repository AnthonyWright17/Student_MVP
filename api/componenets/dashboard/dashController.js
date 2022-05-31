
const db = require('../../../data/data')
const dashQueries = require('./dashQueries')


const getUserById = async(req, res) =>{
  const {id} = req.params

  try {

    const { rows } = await db.query(dashQueries.getUserById, [id])
    const posts = await db.query(dashQueries.getAllPosts, [id])
    console.log(posts.rows)
    const responseObj = {
      user: rows[0],
      posts: posts.rows
    }
    res.json(responseObj)

  } catch (error) {
    if (error) res.send(error)
  }
}

const createPost = async (req, res) => {
  const {post_title, post_content, owner} = req.body

  try {
    const client = await db.connect()
    await client.query(dashQueries.createPost, [post_title,post_content, owner])
    res.status(200)
  } catch (error) {
    if (error) throw error
  }
}
const deletePost = async (req, res) => {
  const {post_id} = req.body;
  try {
    const client = await db.connect()
    await client.query(dashQueries.deletePost, [post_id])
    res.status(200)
  } catch (error) {
    if(error) console.log(error)
  }
}
const updateUser = async (req, res) => {
  console.log(req.body)
  const id = req.body.user_id;
try {
  const client = await db.connect()
  const entityToUpdate = await client.query(dashQueries.getUserById, [id])
  console.log(entityToUpdate.rows[0].f_name)
  const firstName = req.body.f_name || entityToUpdate.rows[0].f_name;
  const lastName = req.body.l_name || entityToUpdate.rows[0].l_name;
  const email = req.body.email || entityToUpdate.rows[0].email;
  const password = req.body.password || entityToUpdate.rows[0].user_password;

  const result = await client.query(dashQueries.editUser, [firstName, lastName, email, password, id])
  res.status(201)
  
} catch (error) {
  if(error) console.log(error)
}
}

module.exports = {
  getUserById,
  createPost,
  deletePost,
  updateUser
}