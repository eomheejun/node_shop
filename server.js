const http = require('http');
const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/orders',orderRoutes);
app.use('/products', productRoutes);

// app.use((req, res) => {

//     res.status(200).json({
//         message:'it works'
//     });
// });


const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log("서버시작되었슴"));

