const Flutterwave = require("flutterwave-node-v3")
// require("dotenv").config()
// const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env

const flw = new Flutterwave(
  "FLWPUBK_TEST-40f028caa1ac4c8d77376470976b85b4-X",
  "FLWSECK_TEST-f0d0f521cefcaa70ffb98db48133859f-X"
)

async function test() {
  try {
    const payload = {
      account_bank: "MPS",
      account_number: "2540782773934",
      amount: 200,
      narration: "ionnodo",
      currency: "NGN",
      reference: "transfer-" + Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
      callback_url: "https://webhook.site/ce1c146f-8667-449e-a065-721cdea15d44",
      debit_currency: "NGN",
    }

    const response = await flw.Transfer.initiate(payload)
    console.log("response", response)
  } catch (error) {
    console.log(error.message)
  }
}

test()
