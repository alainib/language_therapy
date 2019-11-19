const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

console.log("/*****************************/");
console.log("/*       starting API        */");
console.log("/*****************************/");

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use((request, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(request.originalUrl);
  next();
});

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// starting the serveur
let _port = process.env.PORT || 1111;
app.listen(_port, function() {
  console.log("App listening on port " + _port);
});

// serving static files
app.use("/static", express.static(__dirname + "/public"));

var api_services = require("./services");
app.use("/", api_services);
