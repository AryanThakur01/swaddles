import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  deliveryAddress: {
    type: String,
    required: false,
  },
  mobile: {
    type: Number,
    required: false,
  },
  mobileAlt: {
    type: Number,
    required: false,
  },
})
