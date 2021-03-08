const express = require("express");
const path = require("path");

const dbconnection = require("./models")

const app = express()

app.engine('ejs', require('express-ejs-extend'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'static')))

authKick = (req, res, next) => {
  if (!req.isAuthenticated) {
      console.log("Not auth")
  }
  return next()
}

app.use(authKick)
//ROUTER
const router = require("./routes/main_routes")
const authRouter = require("./routes/authentication")
app.use(router)
app.use(authRouter)

const PORT = 8000
app.listen(PORT, console.log(`Running at port ${PORT}`))