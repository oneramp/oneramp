const { Router } = require("express")
const { offRampCreated, getTransactions } = require("../controllers/offramp")

const router = Router()

router.post("/offramp", offRampCreated)
router.get("/offramp", getTransactions)
router.get("/", (req, res) => {
  res.send("seen you too")
})

module.exports = router
