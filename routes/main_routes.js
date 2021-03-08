const express = require("express");

const router = express.Router()

const context = require("../context/main.json");

router.get('/', (req, res, next) => {
    context.pageLink = 'home'
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