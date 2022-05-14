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

// app.get('/', (req, res) => {
//     console.log('/');
//     res.status(201).send('/');
// })

app.get('/article', (req, res) => {
    console.log('/article');
    connection.query (
        "SELECT * FROM article",
        (err, result, fields) => {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result);
        }
    );

    // res.status(200).send();
})

app.post('/article', (req, res) => {
    console.log('/article');
    console.log(req.body.title);
    console.log(req.body.detail);

    const result = connection.query (
        `INSERT INTO article(title, detail) VALUES('${req.body.title}', '${req.body.detail}}')`,
        (err, result, fields) => {
            if (err) throw err;
        }
    )

    if (req.body.title === undefined || req.body.detail == undefined) {
        res.status(400).send('Error!');
    }
    res.status(201).send('/article');
})

app.get('/article/:id', (req, res) => {
    console.log('/article/:id');
    console.log(req.params);
    connection.query (
        `SELECT * FROM article WHERE id=${req.params.id}`,
        (err, result, fields) => {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result);
        }
    );

    // if (req.params.id < 0) res.status(400).send("Error!");
    // res.status(200).send('/article');
})

connection.connect(function (err) {
    if(err){
        console.log("error occured while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

console.log('server start!');
app.listen(5000);

