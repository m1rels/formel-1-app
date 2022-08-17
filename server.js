const express = require('express');
const seasons = require("./data/seasons.json");
const cors = require("cors");
const app = express();
const port = 8081;

app.use(cors());

app.get('/seasons', (req, res) => {
  res.send(seasons);
});

app.get('/seasons/:year/drivers', (req, res) => {
  res.send(req.params);
  next();
});

app.get('/seasons/:year/constructors', (req, res, next) => {
  res.send(req.params);
  next();
});

app.get('/drivers/:driverId', (req, res, next) => {
  res.send(req.params);
  next();
});

app.get('/constructors/:constructorId', (req, res, next) => {
  res.send(req.params);
  next();
});

app.get('/seasons/:year/races', (req, res, next) => {
  res.send(req.params);
  next();
});

app.get('/circuits/:circuitId', (req, res, next) => {
  res.send(req.params);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});