require("dotenv").config();

let express = require("express");
let app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

// console.log('Hello World');

// app.use(function (req, res, next) {
//   // console.log("I'm a middleware...");
//   // console.log(`${req.method}  ${req.path} - ${req.ip}`);
//   var string = req.method + " " + req.path + " - " + req.ip;
//   console.log(string);

//   next();
// });

// app.get('/now', function(req, res, next) {

//         req.time = new Date().toString();

//         next();

//     }, function(req, res) {

//         res.send({time: req.time});

//     }
// );

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/name", function (req, res) {
    const { first, last } = req.query;

    // { name: 'firstname lastname'}

    console.log(first + " " + last);

    res.json({ name: `${first} ${last}` });

    // app.route(path).get(handler).post(handler).
});

app.post("/name", function (req, res) {
    const { first, last } = req.body;

    console.log(first + " " + last);

    res.json({ name: `${first} ${last}` });
});

// app.get( '/json', (req, res) => {

//     console.log(process.env.MESSAGE_STYLE);

//     if (process.env.MESSAGE_STYLE === "uppercase") {
//         res.json({ message: "HELLO JSON" });
//     } else {
//         res.json({ message: "Hello json" });
//     }

// });

module.exports = app;
