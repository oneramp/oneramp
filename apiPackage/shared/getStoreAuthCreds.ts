import fetch from "node-fetch"

const apiURL = "http://localhost:4000/api"

export const getStoreAuthCreds = async (clientId: string, secret: string) => {
  try {
    const data = {
      clientId: clientId,
      secret: secret,
    }

    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(data),
    })

    const result: any = await response.json()

    console.log(result)

    const storeCreds = await result.json()

    console.log("====================================")
    console.log(storeCreds)
    console.log("====================================")

    return storeCreds
  } catch (error) {
    return error
  }
}
