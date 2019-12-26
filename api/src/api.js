const express = require("express");
const router = express.Router();
const path = require("path");
// les données seront dans _IMAGES
require(path.join(__dirname, "..", "data.js"))();
require(path.join(__dirname, "tools.js"))();
require(path.join(__dirname, "serieHelper.js"))();

/**
 *          API
 */

router.get("/ping", function(req, res) {
  return res.status(200).json({ success: true, data: "ping ok" });
});

const _logins = {
  louise: "loulou28",
  david: "david",
  alain:"alain"
};
const _token = "488484sdf84sd8f7s7ezr157705787878787";
router.get("/user/login", function(req, res) {
  const { login, password } = req.query;
  writeLog("trying to login with: " + login + "@" + password + " " + getJMYMH(), path.join(__dirname, "log", "login.log"));

  if (_logins[login] && _logins[login] === password) {
    return res.status(200).json({ success: true, token: _token });
  } else {
    return res.status(401).json({ success: false });
  }
});

router.post("/categorie", function(req, res) {
  const { token } = req.body;

  if (token === _token) {
    let a = randomSerie(
      _IMAGES,
      [req.body.categorieName], // dans le services/mobile on peut passer plusieurs nom de catégories
      req.body.nbrItem,
      req.body.nbrOfImagePerItem,
      req.body.displayLg,
      req.body.level,
      req.body.selectedImages
    );
    // console.log(a);

    return res.status(200).json(a);
  } else {
    return res.status(401).json({ success: false });
  }
});

router.get("/categories", function(req, res) {
  const a = allCategoriesNames(_IMAGES);
  // console.log("get categories", a, allCategoriesNames);
  return res.status(200).json(a);
});

router.get("/input", function(req, res) {
  res.sendFile(path.join(__dirname, "log", "index.html"));
});

router.post("/log", function(req, res) {
  console.log("should write", req.body);
  writeLog(req.body.data);

  return res.status(200).json({ success: true, data: "log success : " + req.body.data });
});
router.get("/log", function(req, res) {
  console.log("should write", req.query);
  writeLog(req.query.data);

  return res.status(200).json({ success: true, data: "log success : " + req.query.data });
});

router.get("/*", function(req, res) {
  console.log("unknow call");
});

module.exports = router;
/*
	
/user/login?login=mylog&password=paswd
router.get("/user/login", function(req, res) {
  const { login, password } = req.query;
   
});


router.get("/test/get/:para1", function(req, res) {
  console.log(req.params.para1);
  console.log(req.query);

  return res.status(200).json({ success: true, data: true });
});

/*
router.get("/test/get", function(req, res) {
  console.log(req.params);

  return res.status(200).json({ success: true, data: true });
});

router.post("/test/post", async function(req, res) {
  console.log(req.body);

  return res.json(200);
});
*/
