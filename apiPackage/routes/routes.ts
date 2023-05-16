import { Router } from "express"
import {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
  getStoreTransactions,
} from "../controllers/store"
import { createTransactionAPI } from "../controllers/transactions"

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
router.get("/store/tx/:storeId", getStoreTransactions)

// Tx
router.post("/tx/create", createTransactionAPI)

export default router
