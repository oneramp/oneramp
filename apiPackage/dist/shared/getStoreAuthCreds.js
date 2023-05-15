"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreAuthCreds = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const apiURL = "http://localhost:4000/api";
const getStoreAuthCreds = async (clientId, secret) => {
    try {
        const data = {
            clientId: clientId,
            secret: secret,
        };
        const response = await (0, node_fetch_1.default)(`${apiURL}/creds`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const result = await response.json();
        const storeCreds = await result.json();
        return storeCreds;
    }
    catch (error) {
        return error;
    }
};
exports.getStoreAuthCreds = getStoreAuthCreds;
