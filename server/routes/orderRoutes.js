const express = require('express')
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController')
const { protect, optionalAuth, adminOnly } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(optionalAuth, createOrder).get(protect, adminOnly, getAllOrders)
router.get('/mine', protect, getMyOrders)
router.get('/:id', optionalAuth, getOrderById)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

module.exports = router

