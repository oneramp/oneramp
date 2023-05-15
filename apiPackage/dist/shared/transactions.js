"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const apiURL_1 = require("../config/apiURL");
const createTransaction = async (txData) => {
    try {
        const newTransaction = {
            store: txData.store,
            txHash: txData.txHash,
            amount: txData.amount,
            fiat: txData.fiat,
            phone: txData.phone,
            asset: txData.asset,
            status: txData.status,
        };
        const response = await axios_1.default.post(`${apiURL_1.apiURL}/tx/create`, newTransaction);
        const result = response.data;
        return result;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
};
exports.createTransaction = createTransaction;
