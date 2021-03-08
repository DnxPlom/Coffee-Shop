const express = require("express");
const mongoose = require("mongoose");

const UserModel = mongoose.model("User")

const router = express.Router()

const context = require("../context/main.json");
const { response } = require("express");

router.get('/', (req, res, next) => {
    context.pageLink = 'home'
    console.log(req.isAuthenticated)
    res.render('home', {
        data: context,
        message: undefined
    })
})

router.get('/blog', (req, res) => {
    context.pageLink = 'blog'
    res.render('blog', {
        data: context,
        message: undefined
    })
})

module.exports = router