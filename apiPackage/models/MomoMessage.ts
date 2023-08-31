import mongoose, { Schema } from "mongoose"
import { MomoMessageI } from "../types"

const MomoMessageModelSchema: Schema = new Schema({
  emulator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emulator",
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<MomoMessageI>(
  "MomoMessage",
  MomoMessageModelSchema
)
