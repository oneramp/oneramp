import fetch from "node-fetch"

const apiURL = "http://localhost:4000/api"


export const getStoreAuthCreds = async (clientId: string, secret: string) => {
  try {
    const data = {
      clientId: clientId,
      secret: secret,
    }

    const response = await fetch("​http://localhost:4000/api/creds", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    }, )

    const result: any = await response.json()
    console.log(response)

    const storeCreds = await result.json()

    return storeCreds
  } catch (error) {
    return error
  }
}