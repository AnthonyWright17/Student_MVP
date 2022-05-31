
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
  console.log(req.body)
  const {post_title, post_content, owner} = req.body

  try {
    await db.query(dashQueries.createPost, [post_title,post_content, owner])
    res.status(200)
  } catch (error) {
    if (error) throw error
  }
}
const deletePost = async (req, res) => {
  console.log(req.body)
  const {post_id} = req.body;
  try {
    await db.query(dashQueries.deletePost, [post_id])
    res.status(200)
  } catch (error) {
    if(error) console.log(error)
  }
}
// const updateUser = async 

module.exports = {
  getUserById,
  createPost,
  deletePost,
}