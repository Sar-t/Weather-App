const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')

const authMiddleware = asyncHandler(async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, 'Missing JWT_SECRET in environment variables.')
  }

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication required.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.userId).select('-password')

    if (!user) {
      throw new ApiError(401, 'Invalid token user.')
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(401, 'Invalid or expired token.')
  }
})

module.exports = authMiddleware
