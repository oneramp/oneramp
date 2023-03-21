const session = require("express-session")

// Add this middleware to your server.js
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: "strict" },
  })
)
