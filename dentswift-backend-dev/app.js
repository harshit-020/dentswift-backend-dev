const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
var cors = require('cors');
var glob = require('glob')
const userRoute = require("./routes/user.routes");
const sellerRoute = require("./routes/seller.routes");
const adminRoute = require("./routes/admin.routes");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/user', userRoute);
app.use('/seller', sellerRoute);
app.use('/admin', adminRoute);

// app.use('/',express.static(path.join(__dirname,'views')));
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'));
// });

app.use('/template', express.static(path.join(__dirname, 'template')));

app.use("/admin", express.static(path.join(__dirname, 'dist', 'Admin')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'Admin', 'index.html'));
})

app.use("/merchant", express.static(path.join(__dirname, 'dist', 'Merchant')));
app.get('/merchant/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'Merchant', 'index.html'));
})

app.get('/ping', (req, res) => {
    res.end(`<html><head><title>Dentswift App</title></head><body><h1 align="center">Dentswift Application On Work</h1></body></html>`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is connected....`);
});

