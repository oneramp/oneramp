const OneRamp = require("..")

const clientPub = "RMPPUBK-cacbc4ef3f9703a3429b-X"
const secretKey = "RMPSEC-a2fd9f528ef158d4f7e8b55741f9ce34e9bb6892-X"

const oneRamp = new OneRamp(clientPub, secretKey)
// const oneRamp = new OneRamp("clientPub", "secretKey")

const deposit = async () => {
  const response = await oneRamp.deposit()

  console.log(response)
}

deposit()
