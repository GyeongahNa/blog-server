const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const util = require('util')
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

const query = util.promisify(connection.query).bind(connection);

app.get('/article', async (req, res) => {
    console.log('/article');

    try {
        let articleResult = await query (
            "SELECT * FROM article");
        console.log(articleResult);
        res.status(200).send(articleResult);
    } catch (err) {
        res.status(500).send();
    }
})

app.post('/article', (req, res) => {
    console.log('/article');

    const title = req.body.title;
    const detail = req.body.detail;
    console.log(title);
    console.log(detail);

    if (req.body.title === undefined || req.body.detail == undefined) {
        res.status(400).send('Error!');
    }

    const result = connection.query (
        `INSERT INTO article(title, detail) VALUES('${title}', '${detail}}')`,
        (err, result, fields) => {
            if (err) throw err;
        }
    )

    res.status(201).send('/article');
})

app.get('/article/:id', async (req, res) => {
    console.log('/article/:id');
    console.log(req.params);
    const id = req.params.id;

    try {
        let articleResult = await query (`SELECT * FROM article WHERE id=${id}`);
        console.log(articleResult);
        res.status(200).send(articleResult);
        
    } catch (err) {
        res.status(500).send();
    }
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

