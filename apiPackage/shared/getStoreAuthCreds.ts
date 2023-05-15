import fetch from "node-fetch"

const apiURL = "http://localhost:4000/api"

<<<<<<< HEAD

=======
>>>>>>> cbda2385b3a12cda68f8d871779b64b96681008d
export const getStoreAuthCreds = async (clientId: string, secret: string) => {
  try {
    const data = {
      clientId: clientId,
      secret: secret,
    }

<<<<<<< HEAD
    const response = await fetch("​http://localhost:4000/api/creds", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    }, )

    const result: any = await response.json()
    console.log(response)
=======
    const response = await fetch(`${apiURL}/creds`, {
      method: "POST",
      body: JSON.stringify(data),
    })

    const result: any = await response.json()
>>>>>>> cbda2385b3a12cda68f8d871779b64b96681008d

    const storeCreds = await result.json()

    return storeCreds
  } catch (error) {
    return error
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> cbda2385b3a12cda68f8d871779b64b96681008d
