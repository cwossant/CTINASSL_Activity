const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const shippingAddressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    province: { type: String, trim: true, default: '' },
    zip: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
  },
  { _id: false },
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    shippingAddress: {
      type: shippingAddressSchema,
      default: () => ({}),
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)

