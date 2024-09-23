const mongoose = require('mongoose');

// local connection
// const conn = mongoose.connect('mongodb://127.0.0.1:27017/DentSwiftdb', { useNewUrlParser: true , useUnifiedTopology: true } );

//live connection
const conn = mongoose.connect('mongodb://dentuser:Dent0505up@127.0.0.1:27017/DentSwiftdb', { useNewUrlParser: true, useUnifiedTopology: true });

//local code with live connection     
// const conn = mongoose.connect('mongodb://dentuser:Dent0505up@15.184.116.154:27017/DentSwiftdb', { useNewUrlParser: true, useUnifiedTopology: true });

//local code with live db     
// const conn = mongoose.connect('mongodb://dentuser:Dent0505up@app.dentswift.com:27017/DentSwiftdb', { useNewUrlParser: true, useUnifiedTopology: true });

//local code with local db
// const conn = mongoose.connect('mongodb://localhost:27017/DentSwiftdb', { useNewUrlParser: true, useUnifiedTopology: true });

if (conn){
    console.log('Mongodb connected successfully.');
}

exports.mongoose = mongoose;
exports.conn = conn;
