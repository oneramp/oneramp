import mongoose, { Document, Schema, Model } from "mongoose"
import { EnviromentE } from "../types"

interface StoreActivityI {
  store: string
  total: number
  deposits: number
  enviroment: EnviromentE
  withdraws: number
}

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
  enviroment: {
    type: String,
    default: "DEV",
  },
  withdraws: {
    type: Number,
    required: true,
    default: 0,
  },
})

const StoreActivityModel = mongoose.model<StoreActivityI>(
  "StoreActivity",
  StoreActivitySchema
)

export default StoreActivityModel
