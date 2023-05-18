import path from "path"
import express, { Express, Request, Response } from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

import { errorHandler, notFound } from "./middlewareHandlers/errorHandler"

// import offrampRoute from "./routes/offrampRoute"
import routes from "./routes/routes"
import connectDB from "./config/connectDB"

dotenv.config({ path: path.join(__dirname, "/.env") })

connectDB()

const app: Express = express()
app.use(express.json())

// Middleware to parse JSON request body
app.use(bodyParser.json())

app.use(cors())
app.get("/", (req: Request, res: Response) => {
  res.send("this is the home page, Welcome")
})

//implementation of routing

app.use("/api", routes)

app.use(errorHandler)
app.use(notFound)

const PORT: any = process.env.PORT || 4000

// testa();

// test();

app.listen(PORT, () =>
  console.log(`app is running in development mode on port 4000`)
)
