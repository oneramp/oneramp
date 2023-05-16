import mongoose, { Document, Schema, Model } from "mongoose"

const TransactionSchema: Schema = new Schema({
  store: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fiat: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const TransactionModel: any = mongoose.model(`Transaction`, TransactionSchema)

export default TransactionModel
