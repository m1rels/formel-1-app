"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = __importStar(require("express"));
var seasons = __importStar(require("./data/seasons.json"));
var cors_1 = __importDefault(require("cors"));
var app = express["default"]();
var port = 8081;
app.use((0, cors_1["default"])());
app.get('/seasons', function (req, res) {
    res.send(seasons);
});
app.get('/seasons/:year/drivers', function (req, res) {
    res.send(req.params);
});
app.get('/seasons/:year/constructors', function (req, res) {
    res.send(req.params);
});
app.get('/drivers/:driverId', function (req, res) {
    res.send(req.params);
});
app.get('/constructors/:constructorId', function (req, res) {
    res.send(req.params);
});
app.get('/seasons/:year/races', function (req, res) {
    res.send(req.params);
});
app.get('/circuits/:circuitId', function (req, res) {
    res.send(req.params);
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
