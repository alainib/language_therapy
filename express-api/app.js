const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

/*
// home page
app.get("/", function(req, res) {
  let html = ` <!DOCTYPE html>
<html>
<body>

<h1>API</h1>
<!--
<p><a href="/static/ressources.zip" target="_blank">ressources.zip</a></p>
<br>
<p>
<img src="/static/aliments/abricot.jpg" width="200"><br>
<a href="/static/aliments/abricot.jpg" target="_blank">image</a></p>
-->
</body>
</html> `;

  res.send(html);
});
*/
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

/**
 *          API
 */
const _logins = {
  louise: "loulou28",
  david: "david"
};
app.get("/api/user/login", function(req, res) {
  const { login, password } = req.query;
  if (_logins[login] && _logins[login] === password) {
    return res.status(200).json({ success: true, data: true });
  } else {
    return res.status(401).json({ success: false, data: null });
  }
});

/*
app.get("/api/test/get/:para1", function(req, res) {
  console.log(req.params.para1);
  console.log(req.query);

  return res.status(200).json({ success: true, data: true });
});

/*
app.get("/api/test/get", function(req, res) {
  console.log(req.params);

  return res.status(200).json({ success: true, data: true });
});

app.post("/api/test/post", async function(req, res) {
  console.log(req.body);

  return res.json(200);
});
*/
