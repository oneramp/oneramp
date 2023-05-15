import storeCredsModel from "../models/storeCredsModel"
import storeModel from "../models/storeModel"
// import oauth2provider from "oauth2provider"
import crypto from "crypto"
import { Request, Response } from "express"
import TransactionModel from "../models/TransactionModel"

export async function createTransactionAPI(req: Request, res: Response) {
  try {
    const newTransaction = {
      store: req.body.store,
      txHash: req.body.txHash,
      amount: req.body.amount,
      fiat: req.body.fiat,
      phone: req.body.phone,
      asset: req.body.asset,
      status: req.body.status,
    }

    const transaction = new TransactionModel(newTransaction)
    const result = await transaction.save()

    return res.status(200).json({
      success: true,
      response: result,
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
