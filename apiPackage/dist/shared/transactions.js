"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = __importDefault(require("../src/utils/constants"));
const currencyConvertor_1 = require("../utils/currencyConvertor");
const createTransaction = async (txData) => {
    try {
        // Convert the currency from here...
        const fiat = await (0, currencyConvertor_1.currencyConvertor)(txData.amount, "USD", "UGX");
        const newTransaction = {
            store: txData.store,
            txHash: txData.txHash,
            amount: txData.amount,
            fiat: fiat,
            phone: txData.phone,
            asset: txData.asset,
            status: txData.status,
        };
        const response = await axios_1.default.post(`${constants_1.default}/tx/create`, newTransaction);
        const result = response.data;
        return result;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
};
exports.createTransaction = createTransaction;
