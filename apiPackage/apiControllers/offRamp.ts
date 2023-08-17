import { Response, Request } from "express"

import storeCredsModel from "../models/storeCredsModel"
import { getCreds } from "../controllers/store"
import addresses, { IfcAddresses } from "../dist/src/utils/address"

function getAllAddresses(addresses: IfcAddresses): string[] {
  let allAddresses: string[] = []
  for (const networkKey in addresses) {
    const network = addresses[networkKey as keyof IfcAddresses]
    allAddresses.push(network.usdt, network.stable, network.dai)
  }
  return allAddresses
}

async function getQuote(req: Request, res: Response) {
  try {
    const { client, secret } = req.headers

    const { tokenAddress, amount, phoneNumber, network } = req.query

    if (!client || !secret) {
      return res.status(401).json({
        response: "Invalid credentials. Go to oneramp.io and create your keys",
      })
    }

    // Verify that the user owns the app's key
    const creds = await storeCredsModel.findOne({
      clientId: client,
      secret: secret,
    })

    if (!creds) {
      return res.status(401).json({
        response: "Invalid credentials. Go to oneramp.io and create your keys",
      })
    }

    if (!tokenAddress || !amount || !phoneNumber) {
      return res.status(400).json({
        response: "Bad entry! Check your query value",
      })
    }

    const allAddresses: any = getAllAddresses(addresses)

    if (!allAddresses.includes(tokenAddress)) {
      return res.status(400).json({
        response: "Invalid token address",
      })
    }

    res.status(200).json({ response: creds })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { getQuote }
