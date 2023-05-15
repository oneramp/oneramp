import axios from "axios"
import { apiURL } from "../config/apiURL"

export const createTransaction = async (txData: any) => {
  try {
    const newTransaction = {
      store: txData.store,
      txHash: txData.txHash,
      amount: txData.amount,
      fiat: txData.fiat,
      phone: txData.phone,
      asset: txData.asset,
      status: txData.status,
    }

    const response = await axios.post(`${apiURL}/tx/create`, newTransaction)

    const result = response.data

    return result
  } catch (error: any) {
    console.log(error.message)
    return error
  }
}
