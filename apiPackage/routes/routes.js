const { Router } = require("express")
const {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
} = require("../controllers/store")

const router = Router()

// STORE ROUTER
// GET all stores owned by a userId
router.get("/stores/:userId", getUserStore)

// Get store using store Id
router.get("/store/:storeId", getStore)

// CREATE a new store
router.post("/stores", createStore)

// delete
router.delete("/store/:storeId", removeStore)

// Store creds
router.get("/creds/:storeId", getStoreCreds)

router.post("/creds/", getCreds)

module.exports = router
