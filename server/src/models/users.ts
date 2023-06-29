import { Model, Schema, model } from 'mongoose'
import { IUser, IUserMethods } from '../config/Interfaces'
import { compare, genSalt, hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

type UserModel = Model<IUser, {}, IUserMethods>
const UserSchema = new Schema<IUser, IUserMethods>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    deliveryAddress: { type: String, required: false },
    mobile: { type: Number, required: true },
    mobileAlt: { type: Number, required: false },
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

export default model<IUser, UserModel>('User', UserSchema)
