const { Request } = require("./request")

class OneRamp {
  constructor(publicKey, secretKey) {
    this.publicKey = publicKey
    this.secretKey = secretKey
  }

  /*
    Verify application creds middleware
    This is a private function, and it will only be accessed and called from the class body
  */
  #verifyCreds = async () => {
    if (!this.publicKey || !this.secretKey) {
      return {
        status: 404,
        message: "No Credentials detected!",
      }
    }

    const request = new Request()

    /* 
        Extract the wanted store information from the db by matching the public and secret key that was entered
        THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
    */
    const data = {
      clientId: this.publicKey,
      secret: this.secretKey,
    }

    const authenticated = await request.db(data)

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

  async withDraw() {
    const result = await this.#verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result
  }

  async deposit() {
    const result = await this.#verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result
  }

  async transactions() {
    const result = await this.#verifyCreds()
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result
  }

  /* Add more functions here.... */
}

module.exports = OneRamp
