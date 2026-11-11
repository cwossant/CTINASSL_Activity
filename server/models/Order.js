const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    },
    sku: { type: String, trim: true, default: '' },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, trim: true, default: '' },
    color: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const orderShippingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    zip: { type: String, required: true, trim: true },
    notes: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    shippingAddress: {
      type: orderShippingSchema,
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['metro', 'metro-express', 'provincial', 'cod'],
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'gcash', 'paymaya', 'card'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    deliveryStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', orderSchema)

