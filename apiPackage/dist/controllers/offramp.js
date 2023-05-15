"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.initiatePayment = exports.test = exports.offRampCreated = void 0;
const offRamp = require("../models/offRampModel");
const Flutterwave = require("flutterwave-node-v3");
require("dotenv").config();
const { PUB_KEY: publicKey, SEC_KEY: secretKey } = process.env;
const flw = new Flutterwave("FLWPUBK_TEST-5b06239b4debbe2260254fff9f0c9dd1-X", "FLWSECK_TEST-a9d419f1df20ab1c648c2c8add3f4072-X");
async function initiatePayment(phoneNumber, intocurrency, currency) {
    try {
        const params = new offRamp({
            account_bank: "MPS",
            account_number: phoneNumber,
            amount: intocurrency,
            currency: currency,
            reference: "transfer-" + Date.now(),
            debit_currency: "UGX",
            beneficiary_name: "cashout",
            callback_url: "https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4",
        });
        const reqParams = await params.save();
        const plainParams = reqParams.toObject(); // Convert the Mongoose document to a plain object
        delete plainParams._id; // Remove the _id property before passing it to the API
        delete plainParams.__v; // Remove the _id property before passing it to the API
        delete plainParams.$__; // Remove the _id property before passing it to the API
        delete plainParams.createdAt; // Remove the _id property before passing it to the API
        delete plainParams.updatedAt; // Remove the _id property before passing it to the API
        const { data } = await flw.Transfer.initiate(plainParams);
        console.log("data", data);
    }
    catch (error) {
        console.error("Error initiating payment:", error);
    }
}
exports.initiatePayment = initiatePayment;
const offRampCreated = async (req, res) => {
    try {
        await initiatePayment(req.body.phoneNumber, req.body.intocurrency, req.body.currency);
        res.json({ message: "Payment initiated successfully" });
    }
    catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({ message: error.message });
    }
};
exports.offRampCreated = offRampCreated;
const getTransactions = async (req, res) => {
    try {
        const posts = await offRamp.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.json(error.message);
    }
};
exports.getTransactions = getTransactions;
async function test() {
    try {
        const payload = {
            account_bank: "044",
            account_number: "0690000040",
            amount: 200,
            narration: "ionnodo",
            currency: "NGN",
            reference: "transfer-" + Date.now(),
            callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
            debit_currency: "NGN",
        };
        const response = await flw.Transfer.initiate(payload);
        console.log("response", response);
    }
    catch (error) {
        console.log(error);
    }
}
exports.test = test;
