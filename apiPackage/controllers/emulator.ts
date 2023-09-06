import { Response } from "express"
import storeModel from "../models/storeModel"
import EmulatorModel from "../models/EmulatorModel"
import MomoMessage from "../models/MomoMessage"

export async function createEmulator(req: any, res: Response) {
  try {
    const { user } = req.user

    const { phone } = req.body

    const store = await storeModel.findOne({ userId: user.id })

    // Check if an emulator with the same phone already exists
    const existingEmulator = await EmulatorModel.findOne({ phone })

    if (existingEmulator) {
      return res
        .status(400)
        .json({ message: "Emulator with this phone already exists." })
    }

    // Create a new emulator if no matching phone is found
    const emulator = new EmulatorModel({
      store: store?._id,
      phone,
    })

    const result = await emulator.save()

    res.status(200).json({ success: true, response: result })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export async function sendEmulatorMomoMessage(req: any, res: Response) {
  try {
    const { store } = req.store

    const { message } = req.body

    // Check if an emulator with the same phone already exists
    const existingEmulator = await EmulatorModel.findOne({ store })

    if (!existingEmulator) {
      return res
        .status(404)
        .json({ message: "You need to first create an emulator." })
    }

    const msg = new MomoMessage({
      emulator: existingEmulator._id,
      message,
    })
    const result = await msg.save()

    return res.status(200).json({ success: true, response: result })
  } catch (error: any) {
    res.status(500).json({ success: false, response: error.message })
  }
}

export async function getEmulator(req: any, res: Response) {
  try {
    const { storeId } = req.params

    // Check if an emulator with the same phone already exists
    const existingEmulator = await EmulatorModel.findOne({ store: storeId })

    if (!existingEmulator) {
      return res.status(404).json({
        succcess: false,
        message: "You need to first create an emulator.",
      })
    }

    return res.status(200).json({ success: true, response: existingEmulator })
  } catch (error: any) {
    res.status(500).json({ success: false, response: error.message })
  }
}

export async function getEmulatorMessages(req: any, res: Response) {
  try {
    const { id } = req.params

    // Check if an emulator with the same phone already exists
    const existingEmulator = await EmulatorModel.findById(id)

    if (!existingEmulator) {
      return res
        .status(404)
        .json({ message: "You need to first create an emulator." })
    }

    const result = await MomoMessage.find({ emulator: id }).sort({
      createdAt: -1,
    })

    return res.status(200).json({ success: true, response: result })
  } catch (error: any) {
    res.status(500).json({ success: false, response: error.message })
  }
}
