const mongoose = require('mongoose')

/**
 * Establish connection to MongoDB via Mongoose.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    process.stderr.write(`MongoDB connection error: ${error.message}\n`)
    process.exit(1)
  }
}

module.exports = connectDB

