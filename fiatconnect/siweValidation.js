const ethers = require("ethers")
const siwe = require("siwe")
const eip1271 = require("eip1271")
const eip2098 = require("eip2098")

// Add this function to your server.js

async function validateSIWESignature(message, signature) {
  const siweMessage = siwe.parse(message)

  // Perform validation checks from the FiatConnect API specification
  // ...

  let signerAddress
  if (isEOA(siweMessage.address)) {
    signerAddress = await siwe.verifySignature(message, signature)
  } else {
    signerAddress = await eip1271.verifySignature(
      siweMessage.address,
      message,
      signature
    )
  }

  return signerAddress === siweMessage.address
}
