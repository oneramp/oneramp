"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const backendCalls_1 = require("../../shared/backendCalls");
const TransactionModel_1 = __importDefault(require("../../models/TransactionModel"));
const constants_1 = __importDefault(require("./constants"));
class Request {
    constructor() {
        this.apiUrl = constants_1.default;
    }
    async db(data) {
        try {
            const result = await (0, backendCalls_1.getStoreAuthCreds)(data.clientId, data.secret);
            if (result === null || result === void 0 ? void 0 : result.store) {
                return {
                    status: 200,
                    success: true,
                    message: "User credentials valid ",
                    store: result.store,
                    env: result.store.env,
                };
            }
            else {
                return {
                    status: 404,
                    success: false,
                    message: "Invalid Credentials",
                    store: null,
                    env: "DEV",
                };
            }
        }
        catch (error) {
            console.log(error.message);
            return {
                status: 500,
                success: false,
                message: "Failed to reach the server",
            };
        }
    }
    async kycApproved(data) {
        try {
            const result = await this.db(data);
            if (!result.success) {
                return new Error("Store not found");
            }
            const requiresKYC = await (0, backendCalls_1.getStoreKYCStatus)(result.store, data);
            if (!requiresKYC.success) {
                return new Error("Store KYC status not found");
            }
            return requiresKYC.response;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async createKYC(data, credentials) {
        try {
            const result = await (0, backendCalls_1.createStoreUserKYC)(data, credentials);
            return result;
        }
        catch (error) {
            return error.message;
        }
    }
    async createTransaction(data) {
        try {
            // const result = await axios.post(`${this.apiUrl}/transactions`, data)
            const newTx = new TransactionModel_1.default(data);
            const result = await newTx.save();
            if (result.data) {
                return {
                    status: 200,
                    success: true,
                    message: "Transaction created ",
                };
            }
            else {
                return {
                    status: 404,
                    success: false,
                    message: "Invalid Credentials",
                };
            }
        }
        catch (error) {
            console.log(error.message);
            return {
                status: 500,
                success: false,
                message: "Failed to reach the server",
            };
        }
    }
}
exports.default = Request;
