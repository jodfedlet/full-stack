const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./api/routes/products")
const ordersRoutes = require("./api/routes/orders")
const usersRoutes = require("./api/routes/users")

mongoose.connect('mongodb://localhost/node-shop',
{
    useMongoClient: true
})

mongoose.Promise = global.Promise

app.use(morgan("dev",))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
     "Origin, X-requested-with, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        return res.status(200).json({})
    }
    next();
})

app.use("/products", productsRoutes)
app.use("/orders", ordersRoutes)
app.use("/users", usersRoutes)

app.use((req, res, next)=>{
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
    next(error)
})

module.exports = app;