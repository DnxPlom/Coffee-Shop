const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: { type: String, required: true },
    contact: {type: String, required: true},
    password: { type: String, required: true }
})

mongoose.model("User", UserSchema);