import axios from "axios"
import { apiURL } from "../config/apiURL"
import { currencyConvertor } from "../utils/currencyConvertor"

export const createTransaction = async (txData: any) => {
  try {
    // Convert the currency from here...
    const fiat = await currencyConvertor(txData.amount, "USD", "UGX")

    console.log("====================================")
    console.log(fiat)
    console.log("====================================")

    const newTransaction = {
      store: txData.store,
      txHash: txData.txHash,
      amount: txData.amount,
      fiat: fiat,
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