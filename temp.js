const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hello world');
  res.status(201).send('Hello World!');
})

app.get('/article', (req, res) => {
  console.log("/article");

  // todo
  res.send('/article');
})

app.get('/article/:id', (req, res) => {
  console.log("/atricle/:id");
  console.log(req.params.id);

  if (req.params.id < 0) res.status(400).send("Error");
  res.send("success");

})

app.post('/article', (req, res) => {
  console.log("/article");
  console.log(req.body);

  if (req.body.title === undefined || req.body.detail === undefined) {
    res.status(400).send("Error");
  }
  res.send("Success!")
})


console.log("server start");
app.listen(5000)