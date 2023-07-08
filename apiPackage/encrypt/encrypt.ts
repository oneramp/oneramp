import CryptoJS from "crypto-js"

import dotenv from "dotenv"

dotenv.config()

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY

const encrypt = async (text: any) => {
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString()

  return ciphertext
}

const decrypt = async (text: any) => {
  // Decrypt
  const bytes = CryptoJS.AES.decrypt(text, ENCRYPTION_KEY)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)

  return originalText
}

export { encrypt, decrypt }
