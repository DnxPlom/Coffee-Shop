const express = require("express");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://dantuwei:Controldata1@cluster0.pteyb.mongodb.net/cofeeshop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("coffeeshop").collection("users");
  console.log(collection)
  client.close();
});

const app = express()

app.engine('ejs', require('express-ejs-extend'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'static')))

//ROUTER
const router = require("./routes/main_routes")
const authRouter = require("./routes/authentication")
app.use(router)
app.use(authRouter)

const PORT = process.env.PORT || 3000
app.listen(process.env.PORT, '0.0.0.0', console.log(`Running at port ${PORT}`))
