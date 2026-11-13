require('dotenv').config();
if (!process.env.MONGO_URI) {
  const path = require('path')
  const serverEnvPath = path.resolve(__dirname, '.env')
  if (path.resolve(process.cwd(), '.env') !== serverEnvPath) {
    require('dotenv').config({ path: serverEnvPath })
  }
}

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('./config/db')
const sendResponse = require('./utils/sendResponse')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  return sendResponse(res, 200, true, { status: 'ok' }, 'Ahon Outdoors API is running')
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    process.stdout.write(`Ahon Outdoors server listening on port ${PORT}\n`)
  })
}

if (require.main === module) {
  startServer()
}

module.exports = app

