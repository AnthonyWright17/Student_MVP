const validateEmail = 'SELECT email FROM users WHERE email = $1;'

const validateUser = 'SELECT email, user_password FROM users WHERE email = $1 AND user_password = $2;'

const getUserIdByEmailNdPsswrd = 'SELECT * FROM users WHERE email =$1 AND user_password = $2;'

const createUser = 'INSERT INTO users(F_name,L_name,email,user_password) VALUES($1, $2, $3, $4);'

const deleteUser = 'DELETE FROM users WHERE email = $1'

module.exports ={
  validateEmail,
  validateUser,
  getUserIdByEmailNdPsswrd,
  createUser,
  deleteUser
}