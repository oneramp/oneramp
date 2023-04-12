const path = require("path")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./config/db.js")
const { initiatePayment, test } = require("./controllers/offramp")
const { errorHandler, notFound } = require("./middlewareHandlers/errorHandler")
require("colors")
require("dotenv").config({ path: __dirname + "/.env" })

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
  res.send("this is the home page, Welcome")
})
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
//implementation of routing
app.use("/api", require("./routes/offrampRoute"))
app.use("/api", require("./routes/routes.js"))

app.use(errorHandler)
app.use(notFound)
const PORT = process.env.PORT || 4000
async function testa() {
  await initiatePayment("1234567890", 60000, "UGX")
}

// testa()

// test()

app.listen(
  PORT,
  console.log(
    `app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
