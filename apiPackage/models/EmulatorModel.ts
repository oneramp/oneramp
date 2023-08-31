import mongoose, { Document, Schema } from "mongoose"
import { EmulatorI } from "../types"

const EmulatorModelSchema: Schema = new Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
})

export default mongoose.model<EmulatorI>("Emulator", EmulatorModelSchema)
