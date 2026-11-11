const mongoose = require('mongoose')

const productImageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true, trim: true },
    label: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const productColorSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    hex: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const productSpecSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price in PHP is required'],
      min: [0, 'Price cannot be negative'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['gear', 'clothes'],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    images: {
      type: [productImageSchema],
      default: [],
    },
    badges: {
      type: [String],
      default: [],
    },
    weight: {
      type: Number,
      required: [true, 'Weight in grams is required'],
      min: [0, 'Weight cannot be negative'],
    },
    waterproofRating: {
      type: Number,
      default: null,
    },
    material: {
      type: String,
      required: [true, 'Material specification is required'],
      trim: true,
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'],
      default: ['One Size'],
    },
    colors: {
      type: [productColorSchema],
      default: [],
    },
    specs: {
      type: [productSpecSchema],
      default: [],
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)

