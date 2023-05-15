import storeCredsModel from "../models/storeCredsModel"
import storeModel from "../models/storeModel"
// import oauth2provider from "oauth2provider"
import crypto from "crypto"
import { Request, Response } from "express"
import TransactionModel from "../models/TransactionModel"

async function getUserStore(req: Request, res: Response) {
  try {
    const stores = await storeModel.find({ userId: req.params.userId })
    res.json(stores)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

async function createStore(req: Request, res: Response) {
  const store = new storeModel({
    userId: req.body.userId,
    storeName: req.body.storeName,
    category: req.body.category,
    description: req.body.description,
  })
  try {
    const newStore = await store.save()

    const clientKey = crypto.randomBytes(16).toString("hex")
    const secretKey = crypto.randomBytes(32).toString("hex")

    const storeCreds = new storeCredsModel({
      store: newStore._id,
      clientId: `RMPPUBK-${clientKey}-X`,
      secret: `RMPSEC-${secretKey}-X`,
    })

    await storeCreds.save()

    res.status(201).json(newStore)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

async function getStore(req: Request, res: Response) {
  try {
    const store = await storeModel.findById(req.params.storeId)
    console.log(store)
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

async function getStoreTransactions(req: Request, res: Response) {
  try {
    console.log(req.params.storeId)

    const store = await storeModel.findById(req.params.storeId)

    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    const transactions = await TransactionModel.find({
      store: req.params.storeId,
    })

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
    res.json(creds)
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

export {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
  getStoreTransactions,
}
