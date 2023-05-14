const offRamp = require("../models/offRampModel");
const Flutterwave = require("flutterwave-node-v3");
require("dotenv").config();
const { PUB_KEY: publicKey, SEC_KEY: secretKey } = process.env;
const flw = new Flutterwave(
  "FLWPUBK_TEST-5b06239b4debbe2260254fff9f0c9dd1-X",
  "FLWSECK_TEST-a9d419f1df20ab1c648c2c8add3f4072-X"
);

async function initiatePayment(phoneNumber: string, intocurrency: string, currency: string) {
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
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
}

const offRampCreated = async (req: any, res: any) => {
  try {
    await initiatePayment(
      req.body.phoneNumber,
      req.body.intocurrency,
      req.body.currency
    );
    res.json({ message: "Payment initiated successfully" });
  } catch (error: any) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ message: error.message });
  }
};
const getTransactions = async (req: any, res: any) => {
  try {
    const posts = await offRamp.find();
    res.status(200).json(posts);
  } catch (error: any) {
    res.json(error.message);
  }
};

async function test() {
  try {
    const payload = {
      account_bank: "044", //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
      account_number: "0690000040",
      amount: 200,
      narration: "ionnodo",
      currency: "NGN",
      reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
      callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
      debit_currency: "NGN",
    };

    const response = await flw.Transfer.initiate(payload);
    console.log("response", response);
  } catch (error) {
    console.log(error);
  }
}

// test();

export { offRampCreated, test, initiatePayment, getTransactions };