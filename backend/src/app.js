const express = require('express')
const cors = require('cors')

const weatherRoutes = require('./routes/weatherRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authRoutes = require('./routes/authRoutes')
const savedCityRoutes = require('./routes/savedCityRoutes')
const insightsRoutes = require('./routes/insightsRoutes')
const { notFoundHandler, errorHandler } = require('./utils/errorHandler')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  })
)
app.use(express.json())

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

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
