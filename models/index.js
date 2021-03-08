const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if (error){
        console.log("An error occured connecting to the database")
    } else {
        console.log("Database successfully connected")
    }
})

const Customers = require("./customers.model");
