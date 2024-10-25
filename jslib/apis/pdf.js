"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apirouter = (0, express_1.Router)();
apirouter.post('/data', (req, res) => {
    console.log("Success");
    res.send("Success");
});
exports.default = apirouter;
