const storeCredsModel = require("../models/storeCredsModel")
const storeModel = require("../models/storeModel")
const oauth2provider = require("oauth2provider")

// GET all stores owned by a userId
async function getUserStore(req, res) {
  try {
    const stores = await storeModel.find({ userId: req.params.userId })
    res.json(stores)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function createStore(req, res) {
  const store = new storeModel({
    userId: req.body.userId,
    storeName: req.body.storeName,
    category: req.body.category,
    description: req.body.description,
  })
  try {
    const newStore = await store.save()

    // Creates the app creds here...
    // TODO: We need to decrypt the store secret keys...

    await oauth2provider.generateClientCredentials(async function (
      error,
      data
    ) {
      const storeCreds = new storeCredsModel({
        store: newStore._id,
        clientId: `RMPPUBK-${data.id}-X`,
        secret: `RMPSEC-${data.secret}-X`,
      })

      const savedCreds = await storeCreds.save()
    })

    res.status(201).json(newStore)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

async function getStore(req, res) {
  try {
    const store = await storeModel.findById(req.params.storeId)
    res.json(store)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getStoreCreds(req, res) {
  try {
    const creds = await storeCredsModel.findOne({ store: req.params.storeId })
    res.json(creds)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getCreds(req, res) {
  try {
    // console.log(req.body)
    const creds = await storeCredsModel.findOne({
      clientId: req.body.clientId,
      secret: req.body.secret,
    })
    res.json(creds)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function removeStore(req, res) {
  try {
    const store = await storeModel.findByIdAndDelete(req.params.storeId)

    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    // Remove also the deleted store creds

    await storeCredsModel.findOneAndDelete({
      store: req.params.storeId,
    })

    res.json({ message: "Store deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  getUserStore,
  createStore,
  getStore,
  removeStore,
  getStoreCreds,
  getCreds,
}
