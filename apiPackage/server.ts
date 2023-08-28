import path from "path"
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { createServer } from "http"
import { Server } from "socket.io"
// import socketIo from "socket.io"

import { errorHandler, notFound } from "./middlewareHandlers/errorHandler"

// import offrampRoute from "./routes/offrampRoute"
import routes from "./routes/routes"
import connectDB from "./config/connectDB"
import router from "./api/routes"
import { initSocket } from "./sockets/sockets"

dotenv.config({ path: path.join(__dirname, "/.env") })

connectDB()

const app: Express = express()
app.use(express.json())
app.use(cors())

// Middleware to parse JSON request body
app.use(bodyParser.json())

const server = createServer(app) // Create an HTTP server
export const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend's URL
    methods: ["GET", "POST", "PUT"],
  },
})

app.get("/", (req: Request, res: Response) => {
  res.send("this is the home page, Welcome")
})

// Socket connections
initSocket()

//implementation of routing
app.use("/api", routes)
app.use("/0x/api", router)

app.use(errorHandler)
app.use(notFound)

const PORT: any = process.env.PORT || 4000

server.listen(PORT, () =>
  console.log(`app is running in development mode on port 4000`)
)
