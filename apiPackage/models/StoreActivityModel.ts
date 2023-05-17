import mongoose, { Document, Schema, Model } from "mongoose"

const StoreActivitySchema = new mongoose.Schema({
  store: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  deposits: {
    type: Number,
    required: true,
    default: 0,
  },
  withdraws: {
    type: Number,
    required: true,
    default: 0,
  },
})

const StoreActivityModel = mongoose.model("StoreActivity", StoreActivitySchema)

export default StoreActivityModel
