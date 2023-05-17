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
import {
  createDeposit,
  createTransactionAPI,
  createWithdraw,
  getAllActivity,
  getDeposits,
  getWithdraw,
  removeActivity,
  removeDeposits,
  removeWithdraws,
} from "../controllers/transactions"

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

// Analytics
router.get("/activity/:storeId", getAllActivity)

router.get("/deposit/:storeId", getDeposits)
router.post("/deposit/create", createDeposit)

router.get("/withdraw/:storeId", getWithdraw)
router.post("/withdraw/create", createWithdraw)

router.get("/del/deposit/:storeId", removeDeposits)
router.get("/del/withdraw/:storeId", removeWithdraws)
router.get("/del/activity/:storeId", removeActivity)

export default router
