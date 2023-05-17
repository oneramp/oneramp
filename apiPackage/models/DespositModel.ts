import mongoose, { Document, Schema, Model } from "mongoose"

const DepositsSchema: Schema = new Schema({
  store: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  asset: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const DepositsModel: any = mongoose.model(`Deposits`, DepositsSchema)

export default DepositsModel
