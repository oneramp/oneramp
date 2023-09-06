import { Response } from "express"
import { Socket } from "socket.io"
import { io } from "../server"

// Store user socket connections
const userConnections: any = []

export const initSocket = () => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected", socket.id)

    socket.on("join", (user: any) => {
      console.log(user, "connected their emulator")

      userConnections[user] = socket.id

      //   userConnections.push({ userId: user, socketId: socket.id })
    })

    socket.on("disconnect", () => {
      const userId = Object.keys(userConnections).find(
        (key) => userConnections[key] === socket.id
      )
      if (userId) {
        delete userConnections[userId]
      }
      console.log("A user disconnected")
    })
  })
}

// Function to send notifications
export async function sendNotification(userId: any, notification: any) {
  const userSocketId = userConnections[userId]

  if (userSocketId) {
    io.to(userSocketId).emit("receiveNotification", notification)
  }
}

export async function sendNotifTx(req: any, res: Response) {
  try {
    const { user, message } = req.body

    // Usage example
    // Call this function whenever you want to send a notification
    sendNotification(user, {
      message: message,
      timestamp: new Date().toLocaleString(),
    })

    return res.status(201).json({ success: true, response: "sent" })
  } catch (error) {
    return res.status(500).json(error)
  }
}
