import mongoose, { Document, Schema, Model } from "mongoose"

const WithdrawSchema: Schema = new Schema({
  store: {
    type: String,
    required: true,
  },
  withdrawAmount: {
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

const WithdrawModel: any = mongoose.model(`Withdraw`, WithdrawSchema)

export default WithdrawModel
