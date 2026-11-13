const mongoose = require('mongoose')

/**
 * Establish connection to MongoDB via Mongoose.
 */
const connectDB = async () => {
  const mongoUri = typeof process.env.MONGO_URI === 'string' ? process.env.MONGO_URI.trim() : ''

  if (!mongoUri) {
    process.stderr.write(
      'MongoDB connection error: MONGO_URI is not defined. Please set MONGO_URI in server/.env.\n',
    )
    process.exit(1)
  }

  try {
    const conn = await mongoose.connect(mongoUri)
    process.stdout.write(`MongoDB connected: ${conn.connection.host}\n`)
    return conn
  } catch (error) {
    process.stderr.write(`MongoDB connection error: ${error.message}\n`)
    if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
      process.stderr.write(
        '👉 Tip: Local MongoDB is not running on 127.0.0.1:27017.\n' +
        '   1. Start local MongoDB via Windows Services or run "net start MongoDB" in an administrator prompt.\n' +
        '   2. Or provide a free MongoDB Atlas cloud URI in server/.env (e.g., MONGO_URI=mongodb+srv://...)\n',
      )
    }
    process.exit(1)
  }
}

module.exports = connectDB

