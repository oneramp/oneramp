import CryptoJS from "crypto-js"
import dotenv from "dotenv"

dotenv.config()

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY

export function encrypt(secret: string): string {
  const encrypted = CryptoJS.AES.encrypt(secret, ENCRYPTION_KEY).toString()
  return encrypted
}

export function decrypt(encryptedSecret: any): string {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedSecret, ENCRYPTION_KEY)
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8)
  return decryptedText
}
