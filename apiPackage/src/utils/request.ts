import axios from "axios"
import { getStoreAuthCreds } from "../../shared/getStoreAuthCreds"
import connectDB from "../../config/connectDB"
import StoreCreds from "../../models/storeCredsModel"
import TransactionModel from "../../models/TransactionModel"
import apiUrl from "./constants"
import { getCreds } from "../../controllers/store"

// connectDB()

class Request {
  apiUrl: string

  constructor() {
    this.apiUrl = apiUrl
  }

  async db(data: any) {
    try {
      // const result = await axios.post(`${this.apiUrl}/creds`, data)

      // const result = await StoreCreds.findOne({ clientId: data.clientId, secret: data.secret })

      const result = await getStoreAuthCreds(data.clientId, data.secret)

      console.log("====================================")
      console.log(result)
      console.log("====================================")

      if (result?.store) {
        return {
          status: 200,
          success: true,
          message: "User credentials valid ",
          store: result.store,
        }
      } else {
        return {
          status: 404,
          success: false,
          message: "Invalid Credentials",
          store: null,
        }
      }
    } catch (error: any) {
      console.log(error.message)
      return {
        status: 500,
        success: false,
        message: "Failed to reach the server",
      }
    }
  }

  async createTransaction(data: any) {
    try {
      // const result = await axios.post(`${this.apiUrl}/transactions`, data)

      const newTx = new TransactionModel(data)

      const result = await newTx.save()
      if (result.data) {
        return {
          status: 200,
          success: true,
          message: "Transaction created ",
        }
      } else {
        return {
          status: 404,
          success: false,
          message: "Invalid Credentials",
        }
      }
    } catch (error: any) {
      console.log(error.message)
      return {
        status: 500,
        success: false,
        message: "Failed to reach the server",
      }
    }
  }
}

export default Request
