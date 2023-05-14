"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const connectDB_1 = __importDefault(require("../config/connectDB"));
const TransactionModel_1 = __importDefault(require("../models/TransactionModel"));
(0, connectDB_1.default)();
async function createTransaction(newTransaction) {
    try {
        const transaction = new TransactionModel_1.default(newTransaction);
        const result = await transaction.save();
        return result;
    }
    catch (error) {
        console.error("Error creating transaction: ", error.message);
        // throw error;
        return error;
    }
}
exports.createTransaction = createTransaction;
