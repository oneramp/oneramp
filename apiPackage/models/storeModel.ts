import mongoose, { Document, Schema } from "mongoose"

interface IStore extends Document {
  userId: string
  storeName: string
  category?: string
  callback?: string
  description?: string
}

const storeModelSchema: Schema = new Schema({
  userId: {
    type: String, // or whatever type you want to use to represent userId
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  callback: {
    type: String,
    default: "http://localhost:4000/callback",
  },
  currency: {
    type: String,
    default: "USD",
  },
})

export default mongoose.model<IStore>("Store", storeModelSchema)
