import Flutterwave from 'flutterwave-node-v3';
const flw = new Flutterwave("FLWPUBK_TEST-40f028caa1ac4c8d77376470976b85b4-X", "FLWSECK_TEST-f0d0f521cefcaa70ffb98db48133859f-X");

async function initiatePayment() {

const details = {
    account_bank: "MPS",
    account_number: "256772799708",
    amount: 1000000,
    currency: "UGX",
    reference: "transfer-" + Date.now(),
    debit_currency: "UGX",
    beneficiary_name: "cashout",
    callback_url: "https://webhook.site/26bc6756-a2f4-49ff-ae94-8d527c40e9ca",

  };
  await flw.Transfer.initiate(details)

  .then((response) => {console.log(response)}) 
    .catch((error) => {console.log(error)});
}

initiatePayment();