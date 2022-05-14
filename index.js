const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();

// ADD THIS
var cors = require('cors');
app.use(cors({origin:['https://localhost:3000'], credentials: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost", // host for connection
    port: 3306, // default port for mysql is 3306
    database: "blog", // database from which we want to connect out node application
    user: "root", // username of the mysql connection
    password: "test" // password of the mysql connection
    });

app.get('/', (req, res) => {
    console.log('/');
    res.status(201).send('/');
})

app.get('/article', (req, res) => {
    console.log('/article');



    res.status(201).send('/article');
})

app.post('/article', (req, res) => {
    console.log('/article');
    console.log(req.body.title);
    console.log(req.body.detail);

    if (req.body.title === undefined || req.body.detail == undefined) {
        res.status(400).send('Error!');
    }
    res.status(201).send('/article');
})

app.get('/article:id', (req, res) => {
    console.log('/article:id');
    if (req.params.id < 0) res.status(400).send("Error!");
    res.status(201).send('/article');
})

connection.connect(function (err) {
    if(err){
        console.log("error occured while connecting");
        console.log(err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

console.log('server start!');
app.listen(5000);

