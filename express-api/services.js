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

let _ignoredSeries = ["personnes-et-action"];
//pour certaines series on ne prend que les images de la même serie
let _unmixedSeries = ["nombres-fr", "nombres-ar"];
// pour certaine series on ne prend pas les images de certaines autres series
// par exemple aliments et recette-arabe
let _excludeFor = {
  aliments: ["recette-arabe"],
  "recette-arabe": ["aliments"]
};
let _allSeriesName = null;
/**
 * retourne la liste des noms de toutes les series disponibles
 */
function allSeriesNames() {
  if (_allSeriesName) {
    return _allSeriesName;
  } else {
    let _names = [];
    for (var cat in _IMAGES) {
      if (!_ignoredSeries.includes(cat)) {
        _names.push(cat);
      }
    }

    _allSeriesName = _names;
    return _allSeriesName;
  }
}

/**
 * retourne une image au hasard parmis une serie
 * @param {*} serieName nom de la serie
 * @param {*} imagesSrc  images à piocher parmis
 * @param {*} deleteItem efface ou non l'image choisi
 */
function randomImageFromSerie(serieName, imagesSrc, deleteItem = false) {
  if (imagesSrc === null || imagesSrc === undefined || imagesSrc[serieName].length < 1) {
    console.error("wrong imagesSrc param data");
    console.log({ serieName, imagesSrc, value: imagesSrc[serieName], length: imagesSrc[serieName].length });
    return null;
  }

  let l = getRandomInt(0, imagesSrc[serieName].length - 1);
  let img = imagesSrc[serieName][l];
  if (deleteItem) {
    imagesSrc[serieName].splice(l, 1);
    if (imagesSrc[serieName].length < 1) {
      delete imagesSrc[serieName];
    }
  }

  return img;
}

/**
 * retourne un nom de serie au hasard différent de ceux passées en parametre
 * @param array of string, excluded series
 */
function randomSerieName(excluded = []) {
  let _names = [];
  if (_allSeriesName === null) {
    _allSeriesName = allSeriesNames();
  }
  for (var i in _allSeriesName) {
    if (!excluded.includes(_allSeriesName[i])) {
      _names.push(_allSeriesName[i]);
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

function randomSerie(
  serieName,
  nbrQuestion = 10,
  nbrOfImagePerQuestion = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  // pour les series nombres-fr et nombres-ar on reste en mode easy
  if (_unmixedSeries.includes(serieName)) {
    level = Config._const.easy;
  }

  let serie = {
    id: Date.now(),
    serieName,
    display: serieName,
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
    // celle de la bonne serie
    if (_useSelectedImages) {
      randomImages.push({
        ...selectedImages[q],
        right: true
      });
    } else {
      randomImages.push({
        ...randomImageFromSerie(serieName, copyIMAGES, true),
        right: true
      });
    }
    if (level === Config._const.easy || level === Config._const.middle) {
      // et 3(ou nbrOfImagePerQuestion-1) autres images d'autres series
      for (var i = 1; i < nbrOfImagePerQuestion; i++) {
        let catTmp = null;

        // si on est dans une serie a ne pas mélanger
        if (_unmixedSeries.includes(serieName)) {
          catTmp = serieName;
        } else {
          let excluded = _excludeFor[serieName] ? [..._excludeFor[serieName]] : [];
          if (level === Config._const.easy) {
            excluded.push(serieName);
          }
          catTmp = randomSerieName([...excluded, ..._unmixedSeries]);
        }
        let repeat = 0;

        while (repeat < 10) {
          let imgTmp;
          if (_unmixedSeries.includes(serieName)) {
            let copyDatasTmp = clone(_IMAGES);
            imgTmp = randomImageFromSerie(catTmp, copyDatasTmp, false);
          } else {
            imgTmp = randomImageFromSerie(catTmp, copyIMAGES, false);
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
      // et 3(ou nbrOfImagePerQuestion) autres images de la même serie
      for (i = 1; i < nbrOfImagePerQuestion; i++) {
        let repeat = 0;
        while (repeat < 10) {
          let imgTmp = randomImageFromSerie(serieName, copyIMAGES, false);

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
    serie.questions.push(questionTmp);
  }

  return serie;
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
  if (_logins[login] && _logins[login] === password) {
    return res.status(200).json({ success: true, token: _token });
  } else {
    return res.status(401).json({ success: false });
  }
});

router.post("/serie", function(req, res) {
  const { token } = req.query;
  if (token === _token) {
    let a = randomSerie(
      req.body.serieName,
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

router.get("/series", function(req, res) {
  return res.status(200).json(allSeriesNames());
});

module.exports = router;
/*
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
