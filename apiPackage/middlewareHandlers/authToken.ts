import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY

function authenticateToken(
  req: any,
  res: Response,
  next: NextFunction
): Response<any> | void {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(403).json({ success: false, message: "Not Authorized." })
  }

  try {
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, ENCRYPTION_KEY) as {
      [key: string]: any
    }

    // Set the user object on the request for use in downstream middleware and routes
    req.user = decoded

    // Call the next middleware or route handler
    next()
  } catch (err) {
    return res.status(401).send("Unauthorized")
  }
}

export { authenticateToken }
