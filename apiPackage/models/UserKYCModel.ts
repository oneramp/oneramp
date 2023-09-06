import mongoose, { Document, Schema } from "mongoose"

interface UserKYCI extends Document {
  store: string
  firstName: string
  lastName: string
  nationality: string
  birthDate: string
  email: string
  diverLicense?: string
  age: string | number
  citizenShip: string
  nationalId: string | number
  fullName: string
  expiryDate?: string
  address: string
  approvedStatus: string
  createdAt: string
}

enum ApprovedStatusE {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

const UserKYCModel: Schema = new Schema({
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  citizenShip: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  approvedStatus: {
    type: String,
    enum: Object.values(ApprovedStatusE),
    default: ApprovedStatusE.PENDING,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<UserKYCI>("UserKYC", UserKYCModel)
