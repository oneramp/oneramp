import { Router } from "express"
import {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
  getStoreTransactions,
  getActiveStore,
  getUserEmailStore,
  newStore,
  getTransactions,
  confirmTransaction,
  addStoreCallback,
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
import { authenticateToken } from "../middlewareHandlers/authToken"
import { createUser, login } from "../controllers/auth"

const router = Router()

// Account routes
router.post("/auth/signup", createUser)
router.post("/auth/login", login)

// STORE ROUTER
// GET all stores owned by a userId
router.get("/stores/:userId", getUserStore)

router.get("/store/active", authenticateToken, getActiveStore)

// Get store using store Id
router.get("/store/:userId", getStore)

// CREATE a new store
router.post("/stores", authenticateToken, createStore)
router.post("/store/create", newStore)

router.post("/store/email", getUserEmailStore)
router.put("/store/callback", addStoreCallback)

// delete
router.delete("/store/:storeId", removeStore)

// Store creds
router.get("/creds/:storeId", getStoreCreds)

router.post("/creds/", getCreds)
router.get("/store/tx/:storeId", getStoreTransactions)

router.get("/txs", getTransactions)
router.post("/tx/confirm", confirmTransaction)

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
