import path from "path"
import express, { Express, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import { initiatePayment } from "./controllers/offramp"
import { errorHandler, notFound } from "./middlewareHandlers/errorHandler"
import colors from "colors"
import dotenv from "dotenv"
import offrampRoute from "./routes/offrampRoute"
import routes from "./routes/routes"
import connectDB from "./config/connectDB"

dotenv.config({ path: path.join(__dirname, "/.env") })

connectDB()

const app: Express = express()
app.use(express.json())
app.use(cors())
app.get("/", (req: Request, res: Response) => {
  res.send("this is the home page, Welcome")
})
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
//implementation of routing
app.use("/api", offrampRoute)
app.use("/api", routes)

app.use(errorHandler)
app.use(notFound)

const PORT: string | number = process.env.PORT || 4000

async function testa() {
  await initiatePayment("1234567890", "60000", "UGX")
}

// testa();

// test();

app.listen(
  PORT,
  () => console.log(
    `app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
)
