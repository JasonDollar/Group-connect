const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../models/User')

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
})

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  user.password = undefined

  res.cookie('jwt', token, cookieOptions)

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

exports.createAccount = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  createAndSendToken(newUser, 201, res)
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'fail',
      data: 'You must provide email and password',
    })
  }
  const user = await User.findOne({ email }).select('+password')
  // +password - if we want to select field which is set to not be selectable  in schema
  const isMatch = user ? await user.correctPassword(password, user.password) : false
  if (!user || !isMatch) {
    return res.status(401).json({
      message: 'fail',
      data: 'Incorrect email or password',
    })
  }
  createAndSendToken(user, 200, res)
}

exports.protect = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(new Error('You are not logged in. Please log in to gain access.'))
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  const freshUser = await User.findById(decoded.id)

  if (!freshUser) {
    return next(new Error('The user belonging to this token no longer exists'))
  }

  req.user = freshUser
  next()
}