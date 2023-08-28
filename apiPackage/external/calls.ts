import axios from "axios"
import TransactionModel from "../models/TransactionModel"
import storeModel from "../models/storeModel"
import { TransactionI } from "../types"
import EmulatorModel from "../models/EmulatorModel"
import MomoMessage from "../models/MomoMessage"
import { sendNotification } from "../sockets/sockets"

export async function callback(tx: string) {
  try {
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { _id: tx },
      { $set: { status: "Done" } },
      { new: true }
    )

    // Get the callback (if you need to perform additional actions)
    const store = await storeModel.findById(updatedTransaction.store)

    const callbackURL: string =
      store?.callback || "http//localhost:4000/callback"

    axios
      .post(callbackURL, updatedTransaction)
      .then((res) => res.data)
      .catch((err) => err.message)

    //   Send a message to their emulator here...
    const emulator = await EmulatorModel.findOne({ store: store?._id })

    if (emulator) {
      const message = `Your ${updatedTransaction.amount} (${updatedTransaction.asset}) withdraw has been sent to your ${updatedTransaction.phone} mobile money 😌`

      sendNotification(store?._id, {
        message: message,
        timestamp: new Date().toLocaleString(),
      })
    }

    return updatedTransaction
  } catch (err: any) {
    console.log(err.message)
    return err
  }
}
