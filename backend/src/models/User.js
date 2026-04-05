const mongoose = require('mongoose')

const savedCitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      default: ''
    }
  },
  {
    _id: true,
    timestamps: true
  }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    savedCities: [savedCitySchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
