import mongoose, { ConnectOptions } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    } as ConnectOptions)
    console.log(`MongoDB connected: ${connection.connection.host}`)
  } catch (error: any) {
    console.error(`ERROR: ${error.message}`)
    return error
  }
}

export default connectDB
