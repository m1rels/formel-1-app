import * as express from 'express'
import * as seasons from './data/seasons.json';
import cors from "cors";
const app = express.default();
const port = 8081;

app.use(cors());

app.get('/seasons', (req, res) => {
  res.send(seasons);
});

app.get('/seasons/:year/drivers', (req, res) => {
  res.send(req.params);
});

app.get('/seasons/:year/constructors', (req, res, ) => {
  res.send(req.params);
  
});

app.get('/drivers/:driverId', (req, res) => {
  res.send(req.params);
});

app.get('/constructors/:constructorId', (req, res) => {
  res.send(req.params);
});

app.get('/seasons/:year/races', (req, res) => {
  res.send(req.params);
});

app.get('/circuits/:circuitId', (req, res) => {
  res.send(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});