import mongoose, { Document, Schema, Model } from "mongoose"
import { EnviromentE, TransactionI } from "../types"

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
  network: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  env: {
    type: String,
    default: "DEV",
  },
})

const TransactionModel: any = mongoose.model<TransactionI>(
  `Transaction`,
  TransactionSchema
)

export default TransactionModel
