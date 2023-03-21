app.post("/auth/login", async (req, res) => {
  const { message, signature } = req.body

  if (await validateSIWESignature(message, signature)) {
    // Create a session for the user
    // ...

    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: "InvalidSignature" })
  }
})
