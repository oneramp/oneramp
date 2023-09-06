"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyConvertor = void 0;
const easy_currencies_1 = require("easy-currencies");
const currencyConvertor = async (amount, currencyFrom, currencyTo) => {
    try {
        if (Number(amount) <= 0) {
            return Number(amount);
        }
        const converter = new easy_currencies_1.Converter();
        const value = await converter.convert(amount, currencyFrom, currencyTo);
        return value.toString();
    }
    catch (error) {
        console.log(error.response);
    }
};
exports.currencyConvertor = currencyConvertor;
