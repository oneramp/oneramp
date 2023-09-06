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
  addStoreKYCEmail,
  getStoreKYC,
  createStoreUserKYC,
  getStoreKYCUsers,
  getRawStoreCreds,
  getUserStoreKYCDetail,
  rejectUserKYC,
  getStorEnv,
  switchStoreEnviroment,
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
import {
  authenticateStoreSecrets,
  authenticateToken,
  authorizeRoute,
} from "../middlewareHandlers/authToken"
import { createUser, login } from "../controllers/auth"
import { githubAuth } from "../middlewareHandlers/githubAuth"
import {
  createEmulator,
  getEmulator,
  getEmulatorMessages,
  sendEmulatorMomoMessage,
} from "../controllers/emulator"
import { sendNotifTx } from "../sockets/sockets"

const router = Router()

// Account routes
router.post("/auth/signup", createUser)
router.post("/auth/login", login)

// STORE ROUTER
// GET all stores owned by a userId
router.get("/stores", authorizeRoute, getUserStore)

router.get("/store/active", authenticateToken, getActiveStore)
router.get("/store/env", authenticateToken, getStorEnv)

// Get store using store Id
router.get("/store/:userId", getStore)

// CREATE a new store
router.post("/stores", authenticateToken, createStore)
router.post("/store/create", newStore)

router.post("/store/email", getUserEmailStore)
router.put("/store/callback", authorizeRoute, addStoreCallback)

// delete
router.delete("/store/:storeId", authorizeRoute, removeStore)

// Store creds
router.get("/creds/:storeId", authorizeRoute, getStoreCreds)
router.post("/switch/", authorizeRoute, switchStoreEnviroment)

router.get("/creds/", authenticateStoreSecrets, getCreds)
router.get("/store/creds", getRawStoreCreds)
router.get("/store/tx/:storeId", authorizeRoute, getStoreTransactions)

router.get("/txs", getTransactions)
router.post("/tx/confirm", confirmTransaction)

// Tx
router.post("/tx/create", createTransactionAPI)

// Analytics
router.get("/activity/:storeId", authorizeRoute, getAllActivity)

router.get("/deposit/:storeId", authorizeRoute, getDeposits)
router.post("/deposit/create", authorizeRoute, createDeposit)

router.get("/withdraw/:storeId", authorizeRoute, getWithdraw)
router.post("/withdraw/create", authorizeRoute, createWithdraw)

router.get("/del/deposit/:storeId", removeDeposits)
router.get("/del/withdraw/:storeId", removeWithdraws)
router.get("/del/activity/:storeId", removeActivity)

// APP KYC
router.post("/kyc", authorizeRoute, addStoreKYCEmail)
router.get("/kyc/:storeId", authenticateStoreSecrets, getStoreKYC)
router.get("/app-kyc/:storeId", authorizeRoute, getStoreKYC)
router.post("/user-kyc", authenticateStoreSecrets, createStoreUserKYC)
router.get("/user-kyc/:store", authorizeRoute, getStoreKYCUsers)
router.get("/user-kyc/info/:user", authorizeRoute, getUserStoreKYCDetail)
router.post("/reject-kyc", authenticateStoreSecrets, rejectUserKYC)

// Emulator
router.post("/emulator", authorizeRoute, createEmulator)
router.post("/emulator/messages", authorizeRoute, sendEmulatorMomoMessage)
router.get("/emulator/messages/:id", authorizeRoute, getEmulatorMessages)
router.get("/emulator/active/:storeId", authorizeRoute, getEmulator)

// Tx Notifications
router.post("/em", sendNotifTx)

export default router
