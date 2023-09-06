"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreUserKYC = exports.getStoreKYCStatus = exports.getStoreAuthCreds = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = __importDefault(require("../src/utils/constants"));
const getStoreAuthCreds = async (clientId, secret) => {
    try {
        const headers = {
            client: clientId,
            secret: secret,
        };
        const response = await axios_1.default.get(`${constants_1.default}/creds`, { headers });
        const result = response.data;
        return result;
    }
    catch (error) {
        return error;
    }
};
exports.getStoreAuthCreds = getStoreAuthCreds;
const getStoreKYCStatus = async (storeId, appCreds) => {
    try {
        const response = await axios_1.default.get(`${constants_1.default}/kyc/${storeId}`, {
            headers: {
                client: appCreds.clientId,
                secret: appCreds.secret,
            },
        });
        const result = response.data;
        return result;
    }
    catch (error) {
        return error;
    }
};
exports.getStoreKYCStatus = getStoreKYCStatus;
const createStoreUserKYC = async (data, credentials) => {
    try {
        const headers = {
            client: credentials.client,
            secret: credentials.secret,
        };
        const response = await axios_1.default.post(`${constants_1.default}/user-kyc/`, data, {
            headers,
        });
        const result = response.data;
        return result;
    }
    catch (error) {
        return error;
    }
};
exports.createStoreUserKYC = createStoreUserKYC;
