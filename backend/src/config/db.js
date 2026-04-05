const mongoose = require('mongoose')

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-weather-assistant'

  await mongoose.connect(mongoUri)
  console.log('MongoDB connected successfully')
}

module.exports = connectDatabase
