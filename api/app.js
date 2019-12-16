const express = require("express");
const api = express();
api.use("/api/", require("./src/index.js") );