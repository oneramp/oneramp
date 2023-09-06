import {
  createStoreUserKYC,
  getStoreAuthCreds,
  getStoreKYCStatus,
} from "../../shared/backendCalls"
import { CredentialsI, KYCFormI, UserCreds } from "../../types"
import connectDB from "../../config/connectDB"
import StoreCreds from "../../models/storeCredsModel"
import TransactionModel from "../../models/TransactionModel"
import apiUrl from "./constants"

class Request {
  apiUrl: string

  constructor() {
    this.apiUrl = apiUrl
  }

  async db(data: UserCreds) {
    try {
      const result = await getStoreAuthCreds(data.clientId, data.secret)

      if (result?.store) {
        return {
          status: 200,
          success: true,
          message: "User credentials valid ",
          store: result.store,
          env: result.store.env,
        }
      } else {
        return {
          status: 404,
          success: false,
          message: "Invalid Credentials",
          store: null,
          env: "DEV",
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

  async kycApproved(data: UserCreds) {
    try {
      const result = await this.db(data)

      if (!result.success) {
        return new Error("Store not found")
      }

      const requiresKYC = await getStoreKYCStatus(result.store, data)

      if (!requiresKYC.success) {
        return new Error("Store KYC status not found")
      }

      return requiresKYC.response
    } catch (error) {
      console.log(error)

      return error
    }
  }

  async createKYC(data: KYCFormI, credentials: CredentialsI) {
    try {
      const result = await createStoreUserKYC(data, credentials)
      return result
    } catch (error: any) {
      return error.message
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
