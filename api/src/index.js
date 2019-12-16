const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const portconfig = require("./port.json");

console.log("/*****************************/");
console.log("/*       starting API        */");
console.log("/*****************************/");

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// middleware qui rajoute le cross origin et log les url
app.use((request, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (request.originalUrl.indexOf("static/") < 0) {
    console.log(request.originalUrl);
  }
  next();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// api services
// on prefixe tous les appels aux services par "api/", pas besoin de le rajouter des les get/post dans le fichier services
var api_services = require("./api.js");
app.use("/api/", api_services);

// serving static files
app.use("/static", express.static(path.join(__dirname, "..", "public")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// starting the serveur
let _port = portconfig.node_port;
app.listen(_port, function() {
  console.log("App listening on port " + _port);
});

module.exports = app;
