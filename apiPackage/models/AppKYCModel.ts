import mongoose, { Document, Schema } from "mongoose"

interface AppKYCI extends Document {
  storeId: string
  requireKyc: boolean
  email?: string
}

const AppKYCModel: Schema = new Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  requireKyc: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

export default mongoose.model<AppKYCI>("AppKYC", AppKYCModel)
