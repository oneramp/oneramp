// const storeCredsModel = require("../models/storeCredsModel")
const storesCreds = require("./data/store")

class OneRamp {
  constructor(publicKey, secretKey) {
    this.publicKey = publicKey
    this.secretKey = secretKey
  }

  /*
    Verify application creds middleware
    This is a private function, and it will only be accessed and called from the class body
*/
  #verifyCreds() {
    if (!this.publicKey || !this.secretKey) {
      return {
        status: 404,
        message: "No Credentials detected!",
      }
    }

    // console.log(typeof this.publicKey, typeof this.secretKey)

    /* 
        Extract the wanted store information from the db by matching the public and secret key that was entered
        THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
    */
    // const authenticated = storesCreds.some(
    //   (store) =>
    //     this.publicKey === store.clientId && this.secretKey === store.secret
    // )

    const authenticated = storeCredsModel.find({
      clientId: this.publicKey,
      secret: this.secretKey,
    })

    console.log("====================================")
    console.log(authenticated)
    console.log("====================================")

    if (!authenticated) {
      return {
        status: 403,
        message: "Invalid Credentials",
      }
    }

    return {
      status: 200,
      message: "User credentials valid ",
    }
  }

  withDraw() {
    console.log("Withdraw called------")
    const result = this.#verifyCreds()
    return result
  }

  deposit() {
    console.log("Deposit called------")
    const result = this.#verifyCreds()
    return result
  }

  transactions() {
    console.log("Store transactions called------")
    const result = this.#verifyCreds()
    return result
  }
}

module.exports = OneRamp
