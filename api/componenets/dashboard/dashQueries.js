const getUserById = 'SELECT * FROM users WHERE user_id = $1;'
const getAllPosts = 'SELECT * FROM posts WHERE FK_Post_Owner = $1;'
const createPost = 'INSERT INTO posts (post_title, post_textcontent, fk_post_owner) VALUES ($1, $2, $3);'
const deletePost = 'DELETE FROM posts WHERE post_id = $1'
const editUser = 'UPDATE users SET f_name = $1, l_name= $2, email = $3, user_password = $4 WHERE user_id = $5;'
module.exports = {
  getUserById,
  getAllPosts,
  createPost,
  deletePost,
  editUser,
}