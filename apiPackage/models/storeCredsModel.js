const mongoose = require("mongoose")
const Schema = mongoose.Schema

const storeCredsModelSchema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("StoreCreds", storeCredsModelSchema)
