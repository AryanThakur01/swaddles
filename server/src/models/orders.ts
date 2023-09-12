import mongoose, { Model, Schema, model } from 'mongoose'
import { IOrder } from '../config/Interfaces'

type OrderModel = Model<IOrder>
const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    Items: [
      {
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product-Id Missing'],
        },
        qty: { type: Number },
      },
    ],
    city: {
      type: String,
    },
    state: { type: String },
    postalCode: { type: String },
    address: { type: String },
    username: { type: String },
    razorpay_order_id: { type: String },
    razorpay_signature: { type: String },
    razorpay_payment_id: { type: String },
    status: {
      type: String,
      default: 'active',
    },
  },
  { timestamps: true }
)

export default model<IOrder, OrderModel>('Order', OrderSchema)
