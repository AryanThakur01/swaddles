import { Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/users'
import { ICustomRequest } from '../config/Interfaces'

export const updateMyData = expressAsyncHandler(
  async (req: ICustomRequest, res: Response) => {
    const { ...updateData } = req.body
    const { payload: _id } = req

    if (updateData.password) {
      //   delete updateData.password
      throw new Error("Can't Update Password")
    }
    if (updateData.email) {
      throw new Error("Can't Update email")
    }
    delete updateData._id

    const user = await User.findByIdAndUpdate(
      _id,
      { ...updateData },
      { new: true }
    )
    if (user) user.password = ''

    res.status(200).json({ ...user })
  }
)
