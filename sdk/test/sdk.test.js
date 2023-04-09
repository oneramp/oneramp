const OneRamp = require("..")

const clientPub = "RMPPUBK-b3123a3197fe30001fe6-X"
const secretKey = "RMPSEC-6bfa4398cb5f4ed1f3618b1ad40be7b03cd79c94-X"

const oneRamp = new OneRamp(clientPub, secretKey)
// const oneRamp = new OneRamp("clientPub", "secretKey")

const deposit = async () => {
  const response = await oneRamp.deposit()

  console.log(response)
}

deposit()
