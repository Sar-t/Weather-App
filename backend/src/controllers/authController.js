const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')

const buildToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, 'Missing JWT_SECRET in environment variables.')
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

const toAuthPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
})

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    throw new ApiError(409, 'Email is already registered.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    savedCities: []
  })

  const token = buildToken(user._id)

  res.status(201).json({
    success: true,
    data: {
      token,
      user: toAuthPayload(user)
    }
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password.')
  }

  const token = buildToken(user._id)

  res.json({
    success: true,
    data: {
      token,
      user: toAuthPayload(user)
    }
  })
})

const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: toAuthPayload(req.user)
    }
  })
})

module.exports = {
  signup,
  login,
  getCurrentUser
}
