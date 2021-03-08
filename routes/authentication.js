const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = mongoose.model("User")

const router = express.Router()

const context = require("../context/main.json");



router.get('/signup', (req, res) => {
    context.pageLink = 'signup'
    return res.render('signup', {
        data: context,
        signupinfo: undefined,
        message: "",
        error: false
    })
})

router.post('/signup', async (req, res) => {
    context.pageLink = 'signup'
    var { username, email, contact, password1, password2} = req.body

    if (!username || !email){
        return res.render('signup', {
            data: context,
            signupinfo: req.body,
            message: "Provide Username and Email",
            error: true
        })
    } else if (password1.length < 6) {
        return res.render('signup', {
            data: context,
            signupinfo: req.body,
            message: "Password too short. Should be 6 characters or more",
            error: true
        })
    } else if (password1 !== password2) {
        return res.render('signup', {
            data: context,
            signupinfo: req.body,
            message: "Passwords do not match",
            error: true
        })
    } else {
        const response = await UserModel.findOne({ email: email })
        if (response) {
            return res.render('signup', {
                data: context,
                signupinfo: req.body,
                message: "Email already exists",
                error: true
            })
        } else {
            const password = await bcrypt.hash(password1, 10)
            UserModel.create({
                username,
                email,
                contact,
                password
            })
            
            return res.render('signup', {
                data: context,
                message: "success",
                error: false
            })
        }
    }
})

router.get('/login', authCheck, async (req, res) => {
    context.pageLink = 'login'

    return res.render('login', {
        data: context,
        logininfo: undefined,
        message: "",
        error: false
    })
})

router.post('/login', authCheck, async (req, res) => {
    context.pageLink = 'login'
    var { email, password } = req.body

    const user = await UserModel.findOne({email: email})

    if (!user) {
        return res.send(JSON.stringify({
            data: context,
            logininfo: req.body,
            message: "User does not exist",
            error: true
        }))
    }

    if (password == null || password == undefined || password =="") {
        return res.render('login', {
            data: context,
            logininfo: req.body,
            message: "Please enter your password",
            error: true
        })
    } else {
    
        const response = await bcrypt.compare(password, user.password)
        if (response) {
            console.log("Login Successful")
            return res.redirect("/")
            
        } else {
            return res.render('login', {
                data: context,
                logininfo: req.body,
                message: "Wrong",
                error: true
            })
        }
    }
    
})

function authCheck (req, res, next) {
    if (req.isAuthenticated){
        console.log("YEs")
    } else {console.log("NO")}
    next()
}

module.exports = router