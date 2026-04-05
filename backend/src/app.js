const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const fs = require('fs')
const path = require('path')

const weatherRoutes = require('./routes/weatherRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')
const savedCityRoutes = require('./routes/savedCityRoutes')
const insightsRoutes = require('./routes/insightsRoutes')
const { notFoundHandler, errorHandler } = require('./utils/errorHandler')

const app = express()

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    }
  })
)
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Weather Assistant API is running.'
  })
})

app.use('/api', weatherRoutes)
app.use('/api', chatRoutes)
app.use('/api', authRoutes)
app.use('/api', savedCityRoutes)
app.use('/api', insightsRoutes)

if (process.env.NODE_ENV === 'production') {
  const frontendDistPath = path.resolve(__dirname, '..', '..', 'frontend', 'dist')

  if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath))

    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(frontendDistPath, 'index.html'))
    })
  }
}

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
