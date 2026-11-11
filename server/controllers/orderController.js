const mongoose = require('mongoose')
const Order = require('../models/Order')
const Product = require('../models/Product')
const asyncHandler = require('../middleware/asyncHandler')
const sendResponse = require('../utils/sendResponse')

const DELIVERY_FEES = {
  metro: 150,
  'metro-express': 290,
  provincial: 250,
  cod: 200,
}

/**
 * POST /api/orders
 * Supports both authenticated users and guest checkout.
 */
const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { items, shippingAddress, deliveryMethod = 'metro', paymentMethod = 'cod' } = req.body

    if (!Array.isArray(items) || items.length === 0) {
      return sendResponse(res, 400, false, null, 'Order must contain at least one item')
    }

    if (!shippingAddress) {
      return sendResponse(res, 400, false, null, 'Shipping address is required')
    }

    if (!(deliveryMethod in DELIVERY_FEES)) {
      return sendResponse(res, 400, false, null, 'Invalid delivery method')
    }

    const resolvedItems = []
    let subtotal = 0

    for (const item of items) {
      const quantity = Math.max(1, Number(item.quantity) || 1)
      let dbProduct = null

      if (item.product && mongoose.Types.ObjectId.isValid(item.product)) {
        dbProduct = await Product.findById(item.product)
      } else if (item.sku) {
        dbProduct = await Product.findOne({ sku: String(item.sku).toUpperCase() })
      }

      if (dbProduct) {
        if (dbProduct.stock < quantity) {
          return sendResponse(
            res,
            400,
            false,
            null,
            `Insufficient stock for ${dbProduct.title} (${dbProduct.stock} remaining)`,
          )
        }
        subtotal += dbProduct.price * quantity
        resolvedItems.push({
          product: dbProduct._id,
          sku: dbProduct.sku,
          title: dbProduct.title,
          price: dbProduct.price,
          quantity,
          size: item.size || '',
          color: item.color || '',
        })
      } else if (item.title && typeof item.price === 'number' && item.price >= 0) {
        subtotal += item.price * quantity
        resolvedItems.push({
          product: null,
          sku: item.sku || '',
          title: item.title,
          price: item.price,
          quantity,
          size: item.size || '',
          color: item.color || '',
        })
      } else {
        return sendResponse(res, 400, false, null, 'Each order item must reference a valid product')
      }
    }

    const shippingFee = DELIVERY_FEES[deliveryMethod]
    const totalAmount = subtotal + shippingFee

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      items: resolvedItems,
      shippingAddress,
      deliveryMethod,
      shippingFee,
      subtotal,
      totalAmount,
      paymentMethod,
    })

    for (const entry of resolvedItems) {
      if (entry.product) {
        await Product.findByIdAndUpdate(entry.product, {
          $inc: { stock: -entry.quantity },
        })
      }
    }

    return sendResponse(res, 201, true, order, 'Order placed successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * GET /api/orders/mine
 */
const getMyOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    return sendResponse(res, 200, true, orders, 'User orders retrieved successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * GET /api/orders/:id
 */
const getOrderById = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
      return sendResponse(res, 404, false, null, 'Order not found')
    }

    const isOwner = order.user && req.user && order.user._id.toString() === req.user._id.toString()
    const isAdmin = req.user && req.user.role === 'admin'

    if (order.user && !isOwner && !isAdmin) {
      return sendResponse(res, 403, false, null, 'Not authorized to view this order')
    }

    return sendResponse(res, 200, true, order, 'Order retrieved successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * GET /api/orders (Admin)
 */
const getAllOrders = asyncHandler(async (_req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 })
    return sendResponse(res, 200, true, orders, 'All orders retrieved successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * PATCH /api/orders/:id/status (Admin)
 */
const updateOrderStatus = asyncHandler(async (req, res, next) => {
  try {
    const { paymentStatus, deliveryStatus } = req.body
    const updates = {}
    if (paymentStatus) updates.paymentStatus = paymentStatus
    if (deliveryStatus) updates.deliveryStatus = deliveryStatus

    const order = await Order.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })

    if (!order) {
      return sendResponse(res, 404, false, null, 'Order not found')
    }

    return sendResponse(res, 200, true, order, 'Order status updated successfully')
  } catch (error) {
    return next(error)
  }
})

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
}

