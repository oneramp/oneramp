import { Request, Response } from "express"
import { encrypt, decrypt } from "../encrypt/encrypt"
import jwt from "jsonwebtoken"

import UserModel from "../models/UserModel"

import dotenv from "dotenv"

dotenv.config()

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY

async function createUser(req: Request, res: Response): Promise<any> {
  try {
    const { firstname, lastname, email, password, local } = req.body

    const existingUser = await UserModel.findOne({ email: email })

    if (existingUser) {
      return res.status(404).json({ response: "Email already in use" })
    }

    // Encrypt the password of the user
    const encryptedPassword = await encrypt(password)

    const user = new UserModel({
      firstName: firstname,
      lastName: lastname,
      password: encryptedPassword,
      email: email,
      local: local,
    })

    const result = await user.save()

    // Generate OTP code number and send to email

    // Create jwt here...
    const token = await jwt.sign({ user: result }, ENCRYPTION_KEY)

    res.status(201).json({ token: token, response: result })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ response: error.message })
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const existingUser = await UserModel.findOne({ email: email })

    if (!existingUser) {
      return res
        .status(404)
        .json({ response: "username or password incorrect" })
    }

    // Check the encrypted password
    const decryptedPassword = await decrypt(existingUser.password)

    if (decryptedPassword != password) {
      return res
        .status(404)
        .json({ response: "username or password incorrect" })
    }

    const token = await jwt.sign({ user: existingUser }, ENCRYPTION_KEY)

    res.status(200).json({ token: token, response: existingUser })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({ response: error.message })
  }
}

export { createUser, login }
