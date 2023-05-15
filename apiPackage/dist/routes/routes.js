"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../controllers/store");
const router = (0, express_1.Router)();
// STORE ROUTER
// GET all stores owned by a userId
router.get("/stores/:userId", store_1.getUserStore);
// Get store using store Id
router.get("/store/:storeId", store_1.getStore);
// CREATE a new store
router.post("/stores", store_1.createStore);
// delete
router.delete("/store/:storeId", store_1.removeStore);
// Store creds
router.get("/creds/:storeId", store_1.getStoreCreds);
router.post("/creds/", store_1.getCreds);
router.get("/store/tx/:storeId", store_1.getStoreTransactions);
exports.default = router;
