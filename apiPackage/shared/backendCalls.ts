import axios from "axios"
import apiUrl from "../src/utils/constants"
import { CredentialsI, KYCFormI, KYCStatusI, UserCreds } from "../types"

export const getStoreAuthCreds = async (clientId: string, secret: string) => {
  try {
    const headers = {
      client: clientId,
      secret: secret,
    }

    const response = await axios.get(`${apiUrl}/creds`, { headers })

    const result = response.data

    return result
  } catch (error) {
    return error
  }
}

export const getStoreKYCStatus = async (
  storeId: string,
  appCreds: UserCreds
): Promise<KYCStatusI> => {
  try {
    const response = await axios.get(`${apiUrl}/kyc/${storeId}`, {
      headers: {
        client: appCreds.clientId,
        secret: appCreds.secret,
      },
    })

    const result = response.data

    return result
  } catch (error: any) {
    return error
  }
}

export const createStoreUserKYC = async (
  data: KYCFormI,
  credentials: CredentialsI
): Promise<KYCFormI> => {
  try {
    const headers = {
      client: credentials.client,
      secret: credentials.secret,
    }
    const response = await axios.post(`${apiUrl}/user-kyc/`, data, {
      headers,
    })

    const result = response.data

    return result
  } catch (error: any) {
    return error
  }
}
