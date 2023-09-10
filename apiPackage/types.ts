import { Document } from "mongoose"

export interface UserCreds {
  clientId: string
  secret: string
}

export interface KYCStatusI {
  success: boolean
  response: {
    _id?: string
    storeId: string
    requireKyc: boolean
    email: string
    __v?: 0
  }
}

export interface CredentialsI {
  client: string
  secret: string
}

export interface KYCFormI {
  firstName: string
  lastName: string
  nationality: string
  birthDate: string
  email: string
  address?: string
  diverLicense?: string
  age: string | number
  citizenShip: string
  nationalId: string | number
  fullName: string
  expiryDate?: string
}

export enum EnviromentE {
  "DEV",
  "LIVE",
}

export interface TransactionI {
  store: string
  txHash: string
  amount: number
  fiat: number
  phone: string
  asset: string
  network?: string
  status: string
  createdAt?: string
}

export interface EmulatorI extends Document {
  store: string
  phone?: string
}

export interface MomoMessageI extends Document {
  emulator: string
  message?: string
}
