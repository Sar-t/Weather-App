const ApiError = require('./ApiError')

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`))
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const payload = {
    success: false,
    message: err.message || 'Something went wrong'
  }

  if (err.details) {
    payload.details = err.details
  }

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack
  }

  res.status(statusCode).json(payload)
}

module.exports = {
  notFoundHandler,
  errorHandler
}
