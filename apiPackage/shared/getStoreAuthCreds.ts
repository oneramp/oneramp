import axios from "axios"
import apiUrl from "../src/utils/constants"

export const getStoreAuthCreds = async (clientId: string, secret: string) => {
  try {
    const data = {
      clientId: clientId,
      secret: secret,
    }

    const response = await axios.post(`${apiUrl}/creds`, data)

    const result = response.data

    return result
  } catch (error) {
    return error
  }
}
