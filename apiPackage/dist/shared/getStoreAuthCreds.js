"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreAuthCreds = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = __importDefault(require("../src/utils/constants"));
const getStoreAuthCreds = async (clientId, secret) => {
    try {
        const data = {
            clientId: clientId,
            secret: secret,
        };
        const response = await axios_1.default.post(`${constants_1.default}/creds`, data);
        const result = response.data;
        return result;
    }
    catch (error) {
        return error;
    }
};
exports.getStoreAuthCreds = getStoreAuthCreds;
