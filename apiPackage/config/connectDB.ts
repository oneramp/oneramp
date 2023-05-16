import mongoose, { ConnectOptions } from "mongoose"

// const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_URI =
  "mongodb+srv://elias-hezron:elias-hezron@cashoutdatabase.7zdto1f.mongodb.net/?retryWrites=true&w=majority"

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
