import mongoose, { Document, Schema } from "mongoose"

interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: String
  local: String
  verified: Boolean
}

const User: Schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  local: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model<IUser>("User", User)
