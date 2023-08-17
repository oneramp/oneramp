// backend/models/Account.ts
import mongoose, { Schema, Document } from "mongoose"

export interface AccountDocument extends Document {
  provider: string
  type: string
  providerAccountId: string
  access_token: string
  token_type: string
  scope: string
  userId: string
}

const accountSchema = new Schema<AccountDocument>({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  token_type: String,
  scope: String,
  userId: String,
})

const Account = mongoose.model<AccountDocument>("Account", accountSchema)

export default Account
