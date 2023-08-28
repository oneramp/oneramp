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
            network: txData.network,
            phone: txData.phone,
            asset: txData.asset,
            status: txData.status,
        };
        // send telegram notification here....
        // Send telegram order msg here...
        const htmlText = `<b>OneRamp MOMO Order</b>
     Send UGX ${fiat} MOMO to ${txData.phone} data.`;
        const response = await axios_1.default.post(`${constants_1.default}/tx/create`, newTransaction);
        const result = response.data;
        telegramOrder(htmlText);
        return result;
    }
    catch (error) {
        console.log(error.message);
        return error;
    }
};
exports.createTransaction = createTransaction;
async function telegramOrder(htmlText) {
    try {
        // const htmlText = `<b>Incoming</b>, <strong>Airtel Data</strong>
        // Send +256700719619 25MB (500UGX) data.`
        const options = {
            method: "POST",
            url: "https://api.telegram.org/bot6268061148%3AAAGi5lzr9LRQp5jr5I5xpWfkmZlNo3268Tg/sendMessage",
            headers: {
                accept: "application/json",
                "User-Agent": "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
                "content-type": "application/json",
            },
            data: {
                chat_id: "6196117698",
                text: htmlText,
                parse_mode: "HTML",
                disable_web_page_preview: false,
                disable_notification: false,
                reply_to_message_id: 0,
            },
        };
        const result = await axios_1.default
            .request(options)
            .then(function (response) {
            return response.data;
        })
            .catch(function (error) {
            return error.message;
        });
        return {
            success: true,
            response: "Order request sent",
            data: result,
        };
    }
    catch (error) {
        console.log(error.message);
        return {
            success: false,
            response: error.message,
        };
    }
}
