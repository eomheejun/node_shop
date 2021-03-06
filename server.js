const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const db = "mongodb+srv://eomheejun:joon9759@cluster0-pukro.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, {useNewUrlParser:true})
    .then( () => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/orders',orderRoutes);
app.use('/products', productRoutes);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log("서버시작되었슴"));


