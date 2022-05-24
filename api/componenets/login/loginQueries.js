const validateEmail = 'SELECT email FROM users WHERE email = $1;'

const validateUser = 'SELECT email, user_password FROM users WHERE email = $1 AND user_password = $2;'

module.exports ={
  validateEmail,
  validateUser
}