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
 * @param {*} alreadyUsed permet de marquer une image comme deja retournée, ut
 * @param {*} check: bool, ne retourne pas une image deja retournée si elle a été marquée avec alreadyUsed
 */
function randomImageFromCategorie(categorieName, imagesSrc, alreadyUsed = false, check = false) {
  let img, l;

  try {
    if (imagesSrc === null || imagesSrc === undefined || imagesSrc[categorieName].length < 1) {
      console.error("wrong imagesSrc param data");
      console.log({ categorieName, imagesSrc, value: imagesSrc[categorieName], length: imagesSrc[categorieName].length });
      return null;
    }

    let unusedImagesSrc = imagesSrc[categorieName].filter(function(obj) {
      return !obj.alreadyUsed;
    });

    if (unusedImagesSrc.length > 0) {
      l = getRandomInt(0, unusedImagesSrc.length - 1);

      img = unusedImagesSrc[l];
    } else {
      // il n'y a plus aucune image de non deja utilisé, on reutilise tant pis
      l = getRandomInt(0, imagesSrc.length - 1);
      img = imagesSrc[categorieName][l];
    }

    if (alreadyUsed) {
      for (let x in imagesSrc[categorieName]) {
        if (imagesSrc[categorieName][x]["fr"] === img["fr"]) {
          imagesSrc[categorieName][x]["alreadyUsed"] = true;
        }
      }
    }
  } catch (error) {
    console.error("check", check);
    console.error("randomImageFromCategorie", error);
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

/**
 * crée une serie d'exercice depuis un nom de categorie donnée
 * @param array categoriesName nom de la categorie pour les réponses justes
 * @param int nbrQuestion : nombre de question
 * @param int nbrOfImagePerItem : nombre d'image par item
 * @param string displayLg : langue du mot à afficher pour chaque item ( FR ou AR )
 * @param string level : easy = on utilise des images que tu meme categorie, middle = on prend tjrs la même categorie pour l'image juste et random pour les autres
 * @param array selectedImages : array of images,
 *
 * si selectedImages not null alors ces images seront utilisées comme image à trouver
 *
 * si c'est niveau facile alors il ne faut pas que les images retournés soit de la meme categorie du tout
 * si c'est niveau moyen alors les images sont un mélange d'autres categories et celle choisie
 * si c'est niveau dur alors les images ne sont que de la categorie choisie
 */
function randomSerie(
  categorieName,
  nbrQuestion = 10,
  nbrOfImagePerItem = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  // pour les categories nombres-fr et nombres-ar on reste en mode easy
  if (_unmixedCategories.includes(categorieName)) {
    level = Config._const.easy;
  }

  let serie = {
    id: Date.now(),
    categorieName,
    display: categorieName,
    questions: []
  };

  try {
    let copyIMAGES = clone(_IMAGES);

    let _useSelectedImages = selectedImages && selectedImages.length > 0;
    if (_useSelectedImages) {
      nbrQuestion = selectedImages.length;
    }
    for (var q = 0; q < nbrQuestion; q++) {
      // il faudra mettre les 4(ou nbrOfImagePerItem) images
      let randomImages = [];
      // on commence par mettre celles de la bonne categorie
      if (_useSelectedImages) {
        randomImages.push({
          ...selectedImages[q],
          right: true
        });
      } else {
        let nbrOfImageFromCategories = 0;
        let nbrOfImageFromOthersCategories = 0;
        switch (level) {
          case Config._const.easy:
            nbrOfImageFromCategories = 1;
            nbrOfImageFromOthersCategories = nbrOfImagePerItem - 1;
            break;
          case Config._const.middle:
            let middle = Math.ceil(nbrOfImagePerItem / 2);
            nbrOfImageFromCategories = middle;
            nbrOfImageFromOthersCategories = nbrOfImagePerItem - middle;
            break;
          case Config._const.hard:
            nbrOfImageFromCategories = nbrOfImagePerItem;
            nbrOfImageFromOthersCategories = 0;
            break;
        }

        // on met la première qui est juste
        randomImages.push({
          ...randomImageFromCategorie(categorieName, copyIMAGES, true, false),
          right: true
        });

        // on met les autres de la meme catégorie
        for (i = 0; i < nbrOfImageFromCategories - 1; i++) {
          let imgTmp = randomImageFromCategorie(categorieName, copyIMAGES, false, true);
          randomImages.push(imgTmp);
        }

        // et on ajoute nbrOfImagePerItem-1 d'images d'autres categories
        for (var i = 0; i < nbrOfImageFromOthersCategories; i++) {
          let catTmp = null;

          // si on est dans une categorie a ne pas mélanger
          if (_unmixedCategories.includes(categorieName)) {
            catTmp = categorieName;
          } else {
            let excluded = _excludeFor[categorieName] ? [categorieName, ..._excludeFor[categorieName]] : [categorieName];
            catTmp = randomCategorieName([...excluded, ..._unmixedCategories]);
          }
          // sale mais bon, fait un while pour etre sur de piocher une image de bonne catégorie

          let imgTmp;
          if (_unmixedCategories.includes(categorieName)) {
            let copyDatasTmp = clone(_IMAGES);
            imgTmp = randomImageFromCategorie(catTmp, copyDatasTmp, false, true);
          } else {
            imgTmp = randomImageFromCategorie(catTmp, copyIMAGES, false, true);
          }
          randomImages.push(imgTmp);
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
  } catch (error) {
    console.log("error", error);
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
  console.log("try to login", login, password);
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
