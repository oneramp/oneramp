const axios = require("axios")
const { apiUrl } = require("../constants")

class Request {
  constructor() {
    this.apiUrl = apiUrl
  }

  async db(data) {
    try {
      const result = await axios.post(`${this.apiUrl}/creds`, data)

      if (result.data) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error.message)
      return error.message
    }
  }
}

module.exports = {
  Request,
}
