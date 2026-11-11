const mongoose = require('mongoose')
const Product = require('../models/Product')
const asyncHandler = require('../middleware/asyncHandler')
const sendResponse = require('../utils/sendResponse')

const SORT_MAP = {
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  'weight-asc': { weight: 1 },
  featured: { createdAt: 1 },
}

/**
 * GET /api/products
 * Supports query params: category, maxPrice, badge, weightClass, search, sort.
 */
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const { category, maxPrice, badge, weightClass, search, sort } = req.query
    const filter = {}

    if (category) {
      const categories = String(category)
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
      if (categories.length > 0) filter.category = { $in: categories }
    }

    if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
      filter.price = { $lte: Number(maxPrice) }
    }

    if (badge) {
      const badges = String(badge)
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean)
      if (badges.length > 0) filter.badges = { $in: badges }
    }

    if (weightClass === 'ultralight') {
      filter.weight = { $lt: 200 }
    } else if (weightClass === 'midweight') {
      filter.weight = { $gte: 200, $lte: 500 }
    } else if (weightClass === 'heavy') {
      filter.weight = { $gt: 500 }
    }

    if (search) {
      const regex = new RegExp(String(search).trim(), 'i')
      filter.$or = [{ title: regex }, { description: regex }, { material: regex }]
    }

    const sortQuery = SORT_MAP[sort] || SORT_MAP.featured
    const products = await Product.find(filter).sort(sortQuery)

    return sendResponse(res, 200, true, products, 'Products retrieved successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * GET /api/products/:id
 * Looks up a product by MongoDB ObjectId or SKU.
 */
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { sku: String(id).toUpperCase() }

    const product = await Product.findOne(query)
    if (!product) {
      return sendResponse(res, 404, false, null, 'Product not found')
    }

    return sendResponse(res, 200, true, product, 'Product retrieved successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * POST /api/products (Admin)
 */
const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    return sendResponse(res, 201, true, product, 'Product created successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * PUT /api/products/:id (Admin)
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return sendResponse(res, 404, false, null, 'Product not found')
    }

    return sendResponse(res, 200, true, product, 'Product updated successfully')
  } catch (error) {
    return next(error)
  }
})

/**
 * DELETE /api/products/:id (Admin)
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return sendResponse(res, 404, false, null, 'Product not found')
    }

    return sendResponse(res, 200, true, { id: product._id }, 'Product deleted successfully')
  } catch (error) {
    return next(error)
  }
})

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}

