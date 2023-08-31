import { NextFunction, Response } from "express"
import Account from "../models/AccountModel"

// Middleware to check if user is authenticated
async function githubAuth(
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response<any> | void> {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(403).json({ success: false, message: "Not Authorized." })
  }

  try {
    // Verify the token and get the decoded payload
    const account = await Account.find()

    console.log("====================================")
    console.log(token)
    console.log("====================================")

    // Set the user object on the request for use in downstream middleware and routes
    // req.user = decoded

    // Call the next middleware or route handler
    next()
  } catch (err) {
    return res.status(401).send("Unauthorized")
  }
}

export { githubAuth }
