const mongoose = require("mongoose")
const Schema = mongoose.Schema

const storeModelSchema = new Schema({
  userId: {
    type: String, // or whatever type you want to use to represent userId
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model("Store", storeModelSchema)
