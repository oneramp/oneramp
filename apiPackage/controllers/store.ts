import storeCredsModel from "../models/storeCredsModel"
// import oauth2provider from "oauth2provider"
import crypto from "crypto"
import axios from "axios"
import { Request, Response } from "express"
import TransactionModel from "../models/TransactionModel"
import StoreActivityModel from "../models/StoreActivityModel"
import jwt from "jsonwebtoken"
import DepositsModel from "../models/DespositModel"
import storeModel from "../models/storeModel"
import UserModel from "../models/UserModel"
import { encrypt } from "../encrypt/encrypt"

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY

async function getUserEmailStore(req: any, res: Response) {
  try {
    // const { user } = req.user

    const { email } = req.body

    const store = await storeModel.findOne({
      email: email,
    })

    res.json(store)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function getActiveStore(req: any, res: Response) {
  try {
    const { user } = req.user

    const store = await storeModel.findOne({
      userId: user._id,
    })

    res.json(store)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function getUserStore(req: any, res: Response) {
  try {
    // const { user } = req.user

    const { userId } = req.params

    const stores = await storeModel.find({ userId: userId })

    res.json(stores)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function newStore(req: any, res: Response) {
  try {
    const { storeName, category, description, userId } = req.body

    const store = new storeModel({
      userId: userId,
      storeName: storeName,
      category: category,
      description: description,
    })

    const newStore = await store.save()

    const clientKey = crypto.randomBytes(16).toString("hex")
    const secretKey = crypto.randomBytes(32).toString("hex")

    const storeCreds = new storeCredsModel({
      store: newStore._id,
      clientId: `RMPPUBK-${clientKey}-X`,
      secret: `RMPSEC-${secretKey}-X`,
    })

    const savedCreds = await storeCreds.save()

    const newStoreActivity = new StoreActivityModel({
      store: newStore._id,
      total: 0,
      deposits: 0,
      withdraws: 0,
    })

    await newStoreActivity.save()

    res.status(201).json({ token: "", response: savedCreds })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function createStore(req: any, res: Response) {
  try {
    const { user } = req.user

    const store = new storeModel({
      userId: user._id,
      storeName: req.body.storeName,
      category: req.body.category,
      description: req.body.description,
    })

    const newStore = await store.save()

    const clientKey = crypto.randomBytes(16).toString("hex")
    const secretKey = crypto.randomBytes(32).toString("hex")

    const storeCreds = new storeCredsModel({
      store: newStore._id,
      clientId: `RMPPUBK-${clientKey}-X`,
      secret: `RMPSEC-${secretKey}-X`,
    })

    const savedCreds = await storeCreds.save()

    const newStoreActivity = new StoreActivityModel({
      store: newStore._id,
      total: 0,
      deposits: 0,
      withdraws: 0,
    })

    await newStoreActivity.save()

    res.status(201).json(savedCreds)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

async function getStore(req: any, res: Response) {
  try {
    // const { user } = req.user

    const { userId } = req.params

    const store = await storeModel.findOne({
      userId: userId,
    })

    res.json(store)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function getStoreCreds(req: Request, res: Response) {
  try {
    const creds = await storeCredsModel.findOne({ store: req.params.storeId })
    // const creds = await storeCredsModel.findOne({
    //   clientId: req.params.clientId,
    //   secret: req.params.secret,
    // })
    res.json(creds)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function confirmTransaction(req: any, res: Response) {
  try {
    const { txId } = req.body

    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { _id: txId },
      { $set: { status: "Done" } },
      { new: true }
    )

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }

    // Get the callback (if you need to perform additional actions)
    const store = await storeModel.findById(updatedTransaction.store)

    const eventData = {
      status: "Successful",
      data: updatedTransaction,
    }

    const callbackURL: string =
      store?.callback || "http//localhost:4000/callback"

    axios
      .post(callbackURL, eventData)
      .then((res) => res.data)
      .catch((err) => err.message)

    return res.status(200).json(updatedTransaction)
  } catch (err: any) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
}

async function getTransactions(req: any, res: Response) {
  try {
    const transactions = await TransactionModel.find().sort({ createdAt: -1 })

    return res.status(200).json(transactions)
  } catch (err: any) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
}

async function getStoreTransactions(req: any, res: Response) {
  try {
    const store = await storeModel.findById(req.params.storeId)

    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    const transactions = await TransactionModel.find({
      store: req.params.storeId,
    }).sort({ createdAt: -1 })

    return res.status(200).json(transactions)
  } catch (err: any) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
}

async function getCreds(req: Request, res: Response) {
  try {
    const creds = await storeCredsModel.findOne({
      clientId: req.body.clientId,
      secret: req.body.secret,
    })
    res.status(201).json(creds)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function removeStore(req: Request, res: Response) {
  try {
    const store = await storeModel.findByIdAndDelete(req.params.storeId)

    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    await storeCredsModel.findOneAndDelete({
      store: req.params.storeId,
    })

    res.json({ message: "Store deleted successfully" })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

async function addStoreCallback(req: any, res: Response) {
  try {
    // const { user } = req.user

    const { storeId, callbackUrl } = req.body

    const store = await storeModel.findOneAndUpdate(
      { _id: storeId }, // Add any relevant conditions here
      { callback: callbackUrl }, // Set the new callbackUrl
      { new: true, upsert: true } // 'new' option returns the updated store, 'upsert' option creates if not found
    )

    res.json(store)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
  getStoreTransactions,
  getActiveStore,
  getUserEmailStore,
  newStore,
  getTransactions,
  confirmTransaction,
  addStoreCallback,
}
