const Config = {
  _const: {
    easy: "easy",
    middle: "middle",
    hard: "hard",
    fr: "fr",
    ar: "ar"
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
 * On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
* permet de tester si la propriété `field` d'un des element du tableau `array` vaut `word`
* [{ "key": "de", "doc_count": 3 },
{ "key": "ad", "doc_count": 1 } ]
* @param word : string
* @param array of object
* @param field name
* @returns {boolean}
*/
function stringInArrayOfObject(word, array, field) {
  let length = array.length;
  word = word.toLowerCase();
  for (let i = 0; i < length; i++) {
    if (array[i][field] && array[i][field].toLowerCase() == word) return true;
  }
  return false;
}

/**
 * retourne un nom de categorie au hasard différent de ceux passées en parametre
 * @param array of string, excluded categories
 */
function randomCategorieName(excluded = []) {
  let _names = [];

  for (var i in _allCategoriesName) {
    if (!excluded.includes(_allCategoriesName[i])) {
      _names.push(_allCategoriesName[i]);
    }
  }

  let l = getRandomInt(0, _names.length - 1);
  return _names[l];
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// retourne le nombre d'image attendu pour la catégorie choisie
function nbrOfImageForCategorie(level, nbrOfImagePerItem) {
  let nbr = 0;
  switch (level) {
    case Config._const.easy:
      nbr = 1;
      break;
    case Config._const.middle:
      let middle = Math.ceil(nbrOfImagePerItem / 2);
      nbr = middle;
      break;
    case Config._const.hard:
      nbr = nbrOfImagePerItem;
      break;
  }
  return nbr;
}

// verifie que images contient le bon nombre d'image de la catégorie
function checkGoodCategorie(images, categorie, nbr, nbrOfImagePerItem) {
  let howMuchFromCategorie = 0;
  if (images.length !== nbrOfImagePerItem) {
    console.log("invalid images length ");
    return false;
  }
  for (let i in images) {
    if (images[i].includes(categorie)) {
      howMuchFromCategorie++;
    }
  }
  return nbr === howMuchFromCategorie;
}

module.exports = function() {
  this.checkGoodImages = function(level, nbrOfImagePerItem, questions, categoriesName) {
    const nbr = nbrOfImageForCategorie(level, nbrOfImagePerItem);

    let goodCategorie = true;
    for (let q in questions) {
      goodCategorie = goodCategorie && checkGoodCategorie(questions[q].images, categoriesName, nbr, nbrOfImagePerItem);
    }
    return goodCategorie;
  };

  /**
 * retourne une image au hasard parmis une categorie
 * 
 * @param {array} imagesSrc  images à piocher parmis
 * @param {string} categorieName nom de la categorie
  // pour l'image principale de l'item
  * @param {bool} setAlreadyUsed permet de marquer une image comme deja retournée, utilisé pour marquer les images utilisées comme item pour ne les retourner qu'une fois si possible
 * pour toutes les images de l'item
 * @param {null/array} exclude, permet d'éviter d'avoir plusieurs fois la meme image par item  
 */
  this.randomImageFromCategorie = function(imagesSrc, setAlreadyUsed = false, exclude = false) {
    let img, l;

    if (imagesSrc === null || imagesSrc === undefined || imagesSrc.length < 1) {
      console.error("wrong imagesSrc param data");
      console.log("randomImageFromCategorie", {
        imagesSrc,
        setAlreadyUsed,
        exclude
      });
      return false;
    }

    // si setAlreadyUsed est true alors on enleve les images deja alreadyUsed
    let unusedImagesSrc = setAlreadyUsed
      ? imagesSrc.filter(function(obj) {
          return !obj.alreadyUsed;
        })
      : imagesSrc;

    let finalSrc;
    if (unusedImagesSrc.length > 0) {
      finalSrc = unusedImagesSrc;
    } else {
      // il n'y a plus aucune image de non deja utilisé, on reutilise tant pis
      finalSrc = imagesSrc;
    }

    if (exclude) {
      finalSrc = finalSrc.filter(function(img) {
        return !stringInArrayOfObject(img.fr, exclude, "fr");
      });
    }

    //
    if (finalSrc.length < 0) {
      finalSrc = imagesSrc.filter(function(img) {
        return !stringInArrayOfObject(img.fr, exclude, "fr");
      });
    }

    l = getRandomInt(0, finalSrc.length - 1);
    img = finalSrc[l];

    if (setAlreadyUsed) {
      for (let x in imagesSrc) {
        if (imagesSrc[x]["fr"] === img["fr"]) {
          imagesSrc[x]["alreadyUsed"] = true;
        }
      }
    }
    return img;
  };

  /**
   * retourne la liste des noms de toutes les categories disponibles
   */
  this.allCategoriesNames = function(imgSrc) {
    if (_allCategoriesName) {
      return _allCategoriesName;
    } else {
      let _names = [];
      for (var cat in imgSrc) {
        if (!_ignoredCategories.includes(cat)) {
          _names.push(cat);
        }
      }

      _allCategoriesName = _names;
      return _allCategoriesName;
    }
  };

  /**
   * crée une serie d'exercice depuis un nom de categorie donnée
   * @param {array} imagesData,
   * @param {array} categoriesName nom de la categorie pour les réponses justes
   * @param {int} nbrItem : nombre de question
   * @param {int} nbrOfImagePerItem : nombre d'image par item
   * @param {string} displayLg : langue du mot à afficher pour chaque item ( FR ou AR )
   * @param {string} level : easy = on utilise des images que tu meme categorie, middle = on prend tjrs la même categorie pour l'image juste et random pour les autres
   * @param {array} selectedImages : array of images,
   *
   * si selectedImages not null alors ces images seront utilisées comme image à trouver
   *
   * si c'est niveau facile alors il ne faut pas que les images retournés soit de la meme categorie du tout
   * si c'est niveau moyen alors les images sont un mélange d'autres categories et celle choisie
   * si c'est niveau dur alors les images ne sont que de la categorie choisie
   */
  this.randomSerie = function(
    imagesData,
    categoriesName,
    nbrItem = 10,
    nbrOfImagePerItem = 4,
    displayLg = Config._const.ar,
    level = Config._const.easy,
    selectedImages = null
  ) {
    if (!Array.isArray(categoriesName)) {
      categoriesName = [categoriesName];
    }
    let serie = {
      id: Date.now(),
      categorieName: categoriesName.toString(),
      display: categoriesName.toString(),
      questions: []
    };

    let copyDatas = clone(imagesData);

    // il ne faut pas mettre plus de question/item que la catégorie n'en contient
    // par exemple ne pas mettre deux fois 1 dans la categorie nombre-fr
    let minCategorieLength = 10000;

    categoriesName.forEach(categorieName => {
      if (copyDatas[categorieName].length < minCategorieLength) {
        minCategorieLength = copyDatas[categorieName].length;
      }
      // pour les categories nombres-fr et nombres-ar on reste en mode easy
      if (_unmixedCategories.includes(categorieName)) {
        level = Config._const.easy;
      }
    });
    if (nbrItem > minCategorieLength) {
      nbrItem = minCategorieLength;
    }

    let _useSelectedImages = selectedImages && selectedImages.length > 0;
    if (_useSelectedImages) {
      nbrItem = selectedImages.length;
    }
    for (var q = 0; q < nbrItem; q++) {
      const categorieName = categoriesName[getRandomInt(0, categoriesName.length - 1)];

      // on commence par mettre les 4(ou nbrOfImagePerItem) images
      let randomImages = [];

      // on met celle de la bonne categorie
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

        /* insert bug for jest test
        if (getRandomInt(0, 100) > 90) {
          nbrOfImageFromCategories = nbrOfImageFromOthersCategories + 1;
        }
       */
        // on met la première qui est juste
        let ni = randomImageFromCategorie(copyDatas[categorieName], true, randomImages);
        if (ni) {
          randomImages.push({
            ...ni,
            right: true
          });
        }

        // on met les autres de la meme catégorie
        for (i = 0; i < nbrOfImageFromCategories - 1; i++) {
          let imgTmp = randomImageFromCategorie(copyDatas[categorieName], false, randomImages);
          if (imgTmp) {
            randomImages.push(imgTmp);
          }
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

          let imgTmp;
          if (_unmixedCategories.includes(categorieName)) {
            let copyDatasTmp = clone(copyDatas);
            imgTmp = randomImageFromCategorie(copyDatasTmp[catTmp], false, randomImages);
          } else {
            imgTmp = randomImageFromCategorie(copyDatas[catTmp], false, randomImages);
          }
          if (imgTmp) {
            randomImages.push(imgTmp);
          }
        }
      }

      shuffleArray(randomImages);

      // il faut retrouver l'index de la bonne image
      let foundIndex = 0;
      // contient juste les chemins des images à afficher
      let images = [];

      for (var i in randomImages) {
        images.push(randomImages[i].path);
        if (randomImages[i].right) {
          foundIndex = i;
        }
      }

      let questionTmp = {
        answer: {
          // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
          rightIndex: foundIndex, // index de la réponse correct
          correct: false,
          attempt: 0
        },
        images: images,
        audio: randomImages[foundIndex]["audio"]
      };
      if (displayLg == Config._const.fr) {
        questionTmp["display"] = randomImages[foundIndex]["fr"];
        questionTmp["clue"] = randomImages[foundIndex]["ar"];
      } else {
        questionTmp["display"] = randomImages[foundIndex]["ar"];
        questionTmp["clue"] = randomImages[foundIndex]["fr"];
      }
      serie.questions.push(questionTmp);
    }

    return serie;
  };
};
