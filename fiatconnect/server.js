const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Add your routes here

app.listen(port, () => {
  console.log(`FiatConnect API server listening at http://localhost:${port}`)
})
