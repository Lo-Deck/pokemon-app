let express = require('express');
let app = express();

console.log('Hello World');



app.get( '/', (req, res) => {

    // res.send('Hello Express');


    // absolutePath = __dirname + "/views/index.html";

    // res.sendFile(__dirname + "/views/index.html");

    app.use(express.static(__dirname + "/public"));



});
































 module.exports = app;
