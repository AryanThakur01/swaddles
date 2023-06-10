import mongoose from 'mongoose'

const connectDb = async (MONGO_URI?: string) => {
  if (MONGO_URI) {
    await mongoose.connect(MONGO_URI)
    console.log('Connected To The Database')
  }
  else{
    throw new Error("Error Connecting To The Database")
  }
}

export default connectDb
