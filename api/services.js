const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
require(path.join(__dirname, "./", "tools.js"))();
// les données seront dans _IMAGES
require(path.join(__dirname, "./", "data.js"))();

const Config = {
  _const: {
    easy: "easy",
    middle: "middle",
    hard: "hard",
    fr: "fr",
    ar: "ar"
  },
  trainOptions: {
    playSoundAfterXWrong: 2
  }
};

let _ignoredCategories = ["personnes-et-action"];
//pour certaines categories on ne prend que les images de la même categorie
let _unmixedCategories = ["nombres-fr", "nombres-ar"];
// pour certaine categories on ne prend pas les images de certaines autres categories
// par exemple aliments et recette-arabe
let _excludeFor = {
  aliments: ["recette-arabe"],
  "recette-arabe": ["aliments"]
};
let _allCategoriesName = null;
/**
 * retourne la liste des noms de toutes les categories disponibles
 */
function allCategoriesNames() {
  if (_allCategoriesName) {
    return _allCategoriesName;
  } else {
    let _names = [];
    for (var cat in _IMAGES) {
      if (!_ignoredCategories.includes(cat)) {
        _names.push(cat);
      }
    }

    _allCategoriesName = _names;
    return _allCategoriesName;
  }
}

/**
 * retourne une image au hasard parmis une categorie
 * @param {*} categorieName nom de la categorie
 * @param {*} imagesSrc  images à piocher parmis
 * @param {*} deleteItem efface ou non l'image choisi
 */
function randomImageFromCategorie(categorieName, imagesSrc, deleteItem = false) {
  if (imagesSrc === null || imagesSrc === undefined || imagesSrc[categorieName].length < 1) {
    console.error("wrong imagesSrc param data");
    console.log({ categorieName, imagesSrc, value: imagesSrc[categorieName], length: imagesSrc[categorieName].length });
    return null;
  }

  let l = getRandomInt(0, imagesSrc[categorieName].length - 1);
  let img = imagesSrc[categorieName][l];
  if (deleteItem) {
    imagesSrc[categorieName].splice(l, 1);
    if (imagesSrc[categorieName].length < 1) {
      delete imagesSrc[categorieName];
    }
  }

  return img;
}

/**
 * retourne un nom de categorie au hasard différent de ceux passées en parametre
 * @param array of string, excluded categories
 */
function randomCategorieName(excluded = []) {
  let _names = [];
  if (_allCategoriesName === null) {
    _allCategoriesName = allCategoriesNames();
  }
  for (var i in _allCategoriesName) {
    if (!excluded.includes(_allCategoriesName[i])) {
      _names.push(_allCategoriesName[i]);
    }
  }

  let l = getRandomInt(0, _names.length - 1);

  return _names[l];
}

// call shuffleArray(array) , modifie la src
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function randomCategorie(
  categorieName,
  nbrQuestion = 10,
  nbrOfImagePerQuestion = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  // pour les categories nombres-fr et nombres-ar on reste en mode easy
  if (_unmixedCategories.includes(categorieName)) {
    level = Config._const.easy;
  }

  let categorie = {
    id: Date.now(),
    categorieName,
    display: categorieName,
    questions: []
  };

  let copyIMAGES = clone(_IMAGES);

  let _useSelectedImages = selectedImages && selectedImages.length > 0;
  if (_useSelectedImages) {
    nbrQuestion = selectedImages.length;
  }
  for (var q = 0; q < nbrQuestion; q++) {
    // on commence par mettre les 4(ou nbrOfImagePerQuestion) images
    let randomImages = [];
    // celle de la bonne categorie
    if (_useSelectedImages) {
      randomImages.push({
        ...selectedImages[q],
        right: true
      });
    } else {
      randomImages.push({
        ...randomImageFromCategorie(categorieName, copyIMAGES, true),
        right: true
      });
    }
    if (level === Config._const.easy || level === Config._const.middle) {
      // et 3(ou nbrOfImagePerQuestion-1) autres images d'autres categories
      for (var i = 1; i < nbrOfImagePerQuestion; i++) {
        let catTmp = null;

        // si on est dans une categorie a ne pas mélanger
        if (_unmixedCategories.includes(categorieName)) {
          catTmp = categorieName;
        } else {
          let excluded = _excludeFor[categorieName] ? [..._excludeFor[categorieName]] : [];
          if (level === Config._const.easy) {
            excluded.push(categorieName);
          }
          catTmp = randomCategorieName([...excluded, ..._unmixedCategories]);
        }
        let repeat = 0;

        while (repeat < 10) {
          let imgTmp;
          if (_unmixedCategories.includes(categorieName)) {
            let copyDatasTmp = clone(_IMAGES);
            imgTmp = randomImageFromCategorie(catTmp, copyDatasTmp, false);
          } else {
            imgTmp = randomImageFromCategorie(catTmp, copyIMAGES, false);
          }

          if (!stringInArrayOfObject(imgTmp.fr, randomImages, "fr")) {
            randomImages.push(imgTmp);
            repeat = 10;
          } else {
            repeat++;
          }
        }
      }
    } else {
      // et 3(ou nbrOfImagePerQuestion) autres images de la même categorie
      for (i = 1; i < nbrOfImagePerQuestion; i++) {
        let repeat = 0;
        while (repeat < 10) {
          let imgTmp = randomImageFromCategorie(categorieName, copyIMAGES, false);

          if (!stringInArrayOfObject(imgTmp.fr, randomImages, "fr")) {
            randomImages.push(imgTmp);
            repeat = 10;
          } else {
            repeat++;
          }
        }
      }
    }

    shuffleArray(randomImages);

    // il faut retrouver l'index de la bonne image
    let foundIndex = 0;
    // contient juste les chemins des images à afficher
    let images = [];

    for (i in randomImages) {
      images.push(randomImages[i].path);
      if (randomImages[i].right) {
        foundIndex = i;
      }
    }

    let questionTmp = {
      answer: {
        // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
        rightIndex: parseInt(foundIndex), // index de la réponse correct
        correct: false,
        attempt: 0
      },
      images: images,
      audio: randomImages[foundIndex]["audio"]
    };
    if (displayLg === Config._const.fr) {
      questionTmp["display"] = randomImages[foundIndex]["fr"];
      questionTmp["clue"] = randomImages[foundIndex]["ar"];
    } else {
      questionTmp["display"] = randomImages[foundIndex]["ar"];
      questionTmp["clue"] = randomImages[foundIndex]["fr"];
    }
    categorie.questions.push(questionTmp);
  }

  return categorie;
}

/**
 *          API
 */

router.get("/ping", function(req, res) {
  return res.status(200).json({ success: true, data: "ping ok" });
});

const _logins = {
  louise: "loulou28",
  david: "david"
};
const _token = "488484sdf84sd8f7s7ezr157705787878787";
router.get("/user/login", function(req, res) {
  const { login, password } = req.query;
  console.log("try to login", login, password);
  if (_logins[login] && _logins[login] === password) {
    return res.status(200).json({ success: true, token: _token });
  } else {
    return res.status(401).json({ success: false });
  }
});

router.post("/categorie", function(req, res) {
  const { token } = req.body;
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  if (token === _token) {
    let a = randomCategorie(
      req.body.categorieName,
      req.body.nbrQuestion,
      req.body.nbrOfImagePerQuestion,
      req.body.displayLg,
      req.body.level,
      req.body.selectedImages
    );
    return res.status(200).json(a);
  } else {
    return res.status(401).json({ success: false });
  }
});

router.get("/categories", function(req, res) {
  return res.status(200).json(allCategoriesNames());
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
