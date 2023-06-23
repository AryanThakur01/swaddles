import mongoose from 'mongoose'
import { compare, genSalt, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
)

UserSchema.pre('save', async function () {
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.methods.checkPassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password)
}

UserSchema.methods.createJWT = async function () {
  const jwtSecret: string = process.env.JWT_SECRET || ''
  const jwtExpiry: string = process.env.JWT_LIFETIME || '10d'
  return jwt.sign({ id: this._id }, jwtSecret, { expiresIn: jwtExpiry })
}

export default mongoose.model('User', UserSchema)
