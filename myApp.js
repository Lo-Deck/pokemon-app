require('dotenv').config();

let express = require('express');
let app = express();


// console.log('Hello World');


app.use('/public', express.static(__dirname + '/public'));

app.get( '/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


app.get( '/json', (req, res) => {

    console.log(process.env.MESSAGE_STYLE);

    let message = process.env.MESSAGE_STYLE;


    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": message.uppercase()});
    }
    else{
        res.json({"message": "Hello json"});    
    }


});
































 module.exports = app;
