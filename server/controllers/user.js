const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

  static signup(req, res, next) {
    const { name, email, password } = req.body

    User.create({ name, email, password })
      .then(user => {
        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        let token = generateToken(payload)
        
        res.status(201).json({ token, payload })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    const { email, password } = req.body

    User.findOne({ email })
      .then(user => {
        if (user) {
          if (comparePassword(password, user.password)) {
            let payload = {
              _id: user._id,
              name: user.name,
              email: user.email
            }
            let token = generateToken(payload)

            res.status(201).json({ token, payload })
          } else {
            next({status: 400, message: 'Incorrect email/password'})
          }
        } else {
          next({status: 400, message: 'Incorrect email/password'})
        }
      })
  }
}

module.exports = UserController
