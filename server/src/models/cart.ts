import mongoose, { Model, Schema, model } from 'mongoose'
import { ICart } from '../config/Interfaces'

type CartModel = Model<ICart>
const CartSchema = new Schema<ICart>(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product-Id Missing'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User-Id Missing'],
      ref: 'User',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity Missing'],
      default: 1,
    },
  },
  { timestamps: true }
)

export default model<ICart, CartModel>('Cart', CartSchema)
