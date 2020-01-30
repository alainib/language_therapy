const express = require("express");
const app = express();
let bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const portconfig = require(path.join(__dirname, "src", "port.json"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// api services
// on prefixe tous les appels aux services par "api/", pas besoin de le rajouter des les get/post dans le fichier services
var api_services = require(path.join(__dirname, "src", "api.js"));
app.use("/api/", api_services);

// serving static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client", "build")));
// et pour tout le reste on renvoi l'index du site web
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
/*
 res.sendFile(path.join(__dirname,   "client", "build", "index.html")); permet de renvoyer  l'index par défaut
 il faut quand meme les autres fichiers static (js,css ...)
 qui ne sont servi que avec `app.use(express.static(path.join(__dirname,  "client", "build")));`
 */

// starting the serveur
let _port = portconfig.node_port;
app.listen(_port, function() {
  console.log("App listening on port " + _port);
});

module.exports = app;
