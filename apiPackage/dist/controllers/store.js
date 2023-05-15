"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreTransactions = exports.getCreds = exports.getStoreCreds = exports.removeStore = exports.getStore = exports.createStore = exports.getUserStore = void 0;
const storeCredsModel_1 = __importDefault(require("../models/storeCredsModel"));
const storeModel_1 = __importDefault(require("../models/storeModel"));
// import oauth2provider from "oauth2provider"
const crypto_1 = __importDefault(require("crypto"));
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
async function getUserStore(req, res) {
    try {
        const stores = await storeModel_1.default.find({ userId: req.params.userId });
        res.json(stores);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getUserStore = getUserStore;
async function createStore(req, res) {
    const store = new storeModel_1.default({
        userId: req.body.userId,
        storeName: req.body.storeName,
        category: req.body.category,
        description: req.body.description,
    });
    try {
        const newStore = await store.save();
        const clientKey = crypto_1.default.randomBytes(16).toString("hex");
        const secretKey = crypto_1.default.randomBytes(32).toString("hex");
        const storeCreds = new storeCredsModel_1.default({
            store: newStore._id,
            clientId: `RMPPUBK-${clientKey}-X`,
            secret: `RMPSEC-${secretKey}-X`,
        });
        await storeCreds.save();
        res.status(201).json(newStore);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
exports.createStore = createStore;
async function getStore(req, res) {
    try {
        const store = await storeModel_1.default.findById(req.params.storeId);
        console.log(store);
        res.json(store);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getStore = getStore;
async function getStoreCreds(req, res) {
    try {
        const creds = await storeCredsModel_1.default.findOne({ store: req.params.storeId });
        // const creds = await storeCredsModel.findOne({
        //   clientId: req.params.clientId,
        //   secret: req.params.secret,
        // })
        res.json(creds);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getStoreCreds = getStoreCreds;
async function getStoreTransactions(req, res) {
    try {
        console.log(req.params.storeId);
        const store = await storeModel_1.default.findById(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        const transactions = await TransactionModel_1.default.find({
            store: req.params.storeId,
        });
        return res.status(200).json(transactions);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
}
exports.getStoreTransactions = getStoreTransactions;
async function getCreds(req, res) {
    try {
        console.log(req.body);
        const creds = await storeCredsModel_1.default.findOne({
            clientId: 'RMPPUBK-5c097ab5011bb9b4123a51050042eddf-X',
            secret: 'RMPSEC-939a0f08ccecb7cafd70eaf075a00fa1727fa60a08507a68943ea2e0b08138cf-X'
        });
        console.log(creds);
        res.json(creds);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getCreds = getCreds;
async function removeStore(req, res) {
    try {
        const store = await storeModel_1.default.findByIdAndDelete(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        await storeCredsModel_1.default.findOneAndDelete({
            store: req.params.storeId,
        });
        res.json({ message: "Store deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
exports.removeStore = removeStore;
