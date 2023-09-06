import { Request, Response } from "express"
import TransactionModel from "../models/TransactionModel"
import DepositsModel from "../models/DespositModel"
import WithdrawModel from "../models/WithdrawModel"
import StoreActivityModel from "../models/StoreActivityModel"
import { callback } from "../external/calls"
import storeModel from "../models/storeModel"
import axios from "axios"

export async function getAllActivity(req: Request, res: Response) {
  try {
    const { storeId } = req.params

    const allActivity = await StoreActivityModel.findOne({ store: storeId })

    return res.status(200).json({
      success: true,
      data: allActivity,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function createTransactionAPI(req: Request, res: Response) {
  try {
    const store = await storeModel.findById(req.body.store)

    const newTransaction = {
      store: req.body.store,
      txHash: req.body.txHash,
      amount: req.body.amount,
      fiat: req.body.fiat,
      network: req.body.network,
      phone: req.body.phone,
      asset: req.body.asset,
      status: req.body.status,
      env: store?.enviroment,
    }

    const transaction = new TransactionModel(newTransaction)
    const result = await transaction.save()

    const dateObj = new Date()
    const day = dateObj.getDate()
    const month = dateObj
      .toLocaleString("default", { month: "short" })
      .slice(0, 3)

    // Create a deposit modal
    const deposit = new DepositsModel({
      store: req.body.store,
      amount: req.body.amount,
      asset: req.body.asset,
      date: `${day}, ${month}`,
    })

    const savedDeposit = await deposit.save()

    const activity = await StoreActivityModel.findOneAndUpdate(
      { store: savedDeposit.store },
      { $inc: { total: savedDeposit.amount, deposits: savedDeposit.amount } },
      { new: true }
    )

    // Finds the store's dev enviroment to see if it's in DevMode and automatically calls the callback
    const enviroment: any = activity?.enviroment

    if (enviroment === "DEV") {
      // send telegram notification here....
      // Send telegram order msg here...
      const htmlText = `<b>OneRamp MOMO Order</b>
     Send UGX ${req.body.fiat} MOMO to ${req.body.phone} data.`

      telegramOrder(htmlText)

      setTimeout(function () {
        // auto call store's callback here
        callback(result._id)
      }, 20000) // 30000 milliseconds = 30 seconds
    }

    return res.status(200).json({
      success: true,
      response: result,
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export async function getFaucet(req: Request, res: Response) {
  try {
    const { address } = req.body

    //
  } catch (error) {}
}

export async function getDeposits(req: Request, res: Response) {
  try {
    const { storeId } = req.params
    const deposits = await DepositsModel.find({ store: storeId })

    return res.status(200).json({
      success: true,
      data: deposits,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function createDeposit(req: Request, res: Response) {
  try {
    const dateObj = new Date()
    const day = dateObj.getDate()
    const month = dateObj
      .toLocaleString("default", { month: "short" })
      .slice(0, 3)

    const deposits = new DepositsModel({
      store: req.body.store,
      amount: req.body.amount,
      date: `${day}, ${month}`,
      asset: req.body.asset,
    })

    const saved = await deposits.save()

    // Make sure they have an all StoreActivityModel
    const storeActivity = await StoreActivityModel.findOne({
      store: req.body.store,
    })

    if (!storeActivity) {
      const newStoreActivity = new StoreActivityModel({
        store: req.body.store,
        total: req.body.amount,
        deposits: req.body.amount,
      })

      await newStoreActivity.save()
    } else {
      storeActivity.total += Number(req.body.amount)
      storeActivity.deposits += Number(req.body.amount)

      await storeActivity.save()
    }

    return res.status(200).json({
      success: true,
      data: saved,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function getWithdraw(req: Request, res: Response) {
  try {
    const { storeId } = req.params
    const deposits = await WithdrawModel.find({ store: storeId })

    return res.status(200).json({
      success: true,
      data: deposits,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function createWithdraw(req: Request, res: Response) {
  try {
    const dateObj = new Date()
    const day = dateObj.getDate()
    const month = dateObj
      .toLocaleString("default", { month: "short" })
      .slice(0, 3)

    const deposits = new WithdrawModel({
      store: req.body.store,
      withdrawAmount: req.body.amount,
      date: `${day}, ${month}`,
      asset: req.body.asset,
    })

    const saved = await deposits.save()

    // Make sure they have an all StoreActivityModel
    const storeActivity = await StoreActivityModel.findOne({
      store: req.body.store,
    })

    if (!storeActivity) {
      const newStoreActivity = new StoreActivityModel({
        store: req.body.store,
        total: req.body.amount,
        withdraws: req.body.amount,
      })

      await newStoreActivity.save()
    } else {
      storeActivity.total += Number(req.body.amount)
      storeActivity.withdraws += Number(req.body.amount)

      await storeActivity.save()
    }

    return res.status(200).json({
      success: true,
      data: saved,
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function removeDeposits(req: Request, res: Response) {
  try {
    const { storeId } = req.params
    const deposits = await DepositsModel.deleteMany({ store: storeId })

    return res.status(200).json({
      success: true,
      data: "removed",
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function removeWithdraws(req: Request, res: Response) {
  try {
    const { storeId } = req.params
    await WithdrawModel.deleteMany({ store: storeId })

    return res.status(200).json({
      success: true,
      data: "removed",
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

export async function removeActivity(req: Request, res: Response) {
  try {
    const { storeId } = req.params
    await StoreActivityModel.deleteMany({ store: storeId })

    return res.status(200).json({
      success: true,
      data: "removed",
    })
  } catch (error: any) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      response: error.message,
    })
  }
}

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

async function telegramOrder(htmlText: string) {
  try {
    // const htmlText = `<b>Incoming</b>, <strong>Airtel Data</strong>
    // Send +256700719619 25MB (500UGX) data.`

    const options = {
      method: "POST",
      url: "https://api.telegram.org/bot6268061148%3AAAGi5lzr9LRQp5jr5I5xpWfkmZlNo3268Tg/sendMessage",
      headers: {
        accept: "application/json",
        "User-Agent":
          "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
        "content-type": "application/json",
      },
      data: {
        chat_id: "6196117698",
        text: htmlText,
        parse_mode: "HTML",
        disable_web_page_preview: false,
        disable_notification: false,
        reply_to_message_id: 0,
      },
    }

    const result = await axios
      .request(options)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.message
      })

    return {
      success: true,
      response: "Order request sent",
      data: result,
    }
  } catch (error: any) {
    console.log(error.message)
    return {
      success: false,
      response: error.message,
    }
  }
}
