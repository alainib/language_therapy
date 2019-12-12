import RawDatas from "language_therapy/ressources/data";

import * as tools from "language_therapy/src/tools";

import Config from "language_therapy/src/Config";

/**
 * retourne une image au hasard parmis une categorie
 * @param {*} categorieName nom de la categorie
 * @param {*} imagesSrc  images à piocher parmis
 * @param {*} deleteItem efface ou non l'image choisi
 */
function randomImageFromCategorie(categorieName, imagesSrc, deleteItem = false) {
  if (imagesSrc == null || imagesSrc == undefined || imagesSrc[categorieName].length < 1) {
    console.error("wrong imagesSrc param data");
    console.log({ categorieName, imagesSrc, value: imagesSrc[categorieName], length: imagesSrc[categorieName].length });
    return null;
  }

  let l = tools.getRandomInt(0, imagesSrc[categorieName].length - 1);
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

  for (var i in _allCategoriesName) {
    if (!excluded.includes(_allCategoriesName[i])) {
      _names.push(_allCategoriesName[i]);
    }
  }

  let l = tools.getRandomInt(0, _names.length - 1);
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
export async function image_AllCategoriesNames() {
  /*const connected = await tools.isConnectedToNetwork();
  console.log(connected);*/

  if (_allCategoriesName) {
    return _allCategoriesName;
  } else {
    let _names = [];
    for (var cat in RawDatas._IMAGES) {
      if (!_ignoredCategories.includes(cat)) {
        _names.push(cat);
      }
    }

    _allCategoriesName = _names;
    return _allCategoriesName;
  }
}

/**
 * crée une categorie d'exercice depuis un nom de categorie donnée
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
export function image_randomCategorie(
  categoriesName,
  nbrQuestion = 10,
  nbrOfImagePerItem = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  categoriesName.forEach(categorieName => {
    // pour les categories nombres-fr et nombres-ar on reste en mode easy
    if (_unmixedCategories.includes(categorieName)) {
      level = Config._const.easy;
    }
  });
  let categorie = {
    id: Date.now(),
    categorieName: categoriesName.toString(),
    display: categoriesName.toString(),
    questions: []
  };

  let copyDatas = tools.clone(RawDatas);

  let _useSelectedImages = selectedImages && selectedImages.length > 0;
  if (_useSelectedImages) {
    nbrQuestion = selectedImages.length;
  }
  for (var q = 0; q < nbrQuestion; q++) {
    const categorieName = categoriesName[tools.getRandomInt(0, categoriesName.length - 1)];
    console.log("aaaaa", {
      categorieName,
      categoriesName
    });

    // on commence par mettre les 4(ou nbrOfImagePerItem) images
    let randomImages = [];

    // on met celle de la bonne categorie
    if (_useSelectedImages) {
      randomImages.push({
        ...selectedImages[q],
        right: true
      });
    } else {
      randomImages.push({
        ...randomImageFromCategorie(categorieName, copyDatas._IMAGES, true),
        right: true
      });
    }

    if (level == Config._const.easy || level == Config._const.middle) {
      // et 3(ou nbrOfImagePerItem-1) autres images d'autres categories
      for (var i = 1; i < nbrOfImagePerItem; i++) {
        let catTmp = null;

        // si on est dans une categorie a ne pas mélanger
        if (_unmixedCategories.includes(categorieName)) {
          catTmp = categorieName;
        } else {
          let excluded = _excludeFor[categorieName] ? [..._excludeFor[categorieName]] : [];
          if (level == Config._const.easy) {
            excluded.push(categorieName);
          }
          catTmp = randomCategorieName([...excluded, ..._unmixedCategories]);
        }

        let repeat = 0;

        while (repeat < 10) {
          let imgTmp;
          if (_unmixedCategories.includes(categorieName)) {
            let copyDatasTmp = tools.clone(RawDatas);
            imgTmp = randomImageFromCategorie(catTmp, copyDatasTmp._IMAGES, false);
          } else {
            imgTmp = randomImageFromCategorie(catTmp, copyDatas._IMAGES, false);
          }

          if (!tools.stringInArrayOfObject(imgTmp.fr, randomImages, "fr")) {
            randomImages.push(imgTmp);
            repeat = 10;
          } else {
            repeat++;
          }
        }
      }
    } else {
      // et 3(ou nbrOfImagePerItem) autres images de la même categorie
      for (var i = 1; i < nbrOfImagePerItem; i++) {
        let repeat = 0;
        while (repeat < 10) {
          let imgTmp = randomImageFromCategorie(categorieName, copyDatas._IMAGES, false);
          if (!tools.stringInArrayOfObject(imgTmp.fr, randomImages, "fr")) {
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
    categorie.questions.push(questionTmp);
  }

  return categorie;
}

/**
 * retourne toutes les images d'une categorie
   utilisé pour choix images à la main
   @param string categorieName
   @param bool sort
*/
export function image_allImagesFromCategorie(categorieName, sort = false) {
  let imgs = tools.clone(RawDatas._IMAGES[categorieName]);
  return tools.arrayObjectSort(imgs, "audio");
}

/**
 * creée une categorie pour trainCategorie à partir d'images selectionnées à la main
 * @param string categorieName
 * @param array selectedImages
 */
export function image_categorieFromImages(selectedImages, categorieName, nbrQuestion, nbrOfImagePerItem, displayLg, level) {
  return image_randomCategorie([categorieName], nbrQuestion, nbrOfImagePerItem, displayLg, level, selectedImages);
}

/*
/////////////   unused
// random depuis tt les categories
export function createMotImageCategorie(nbrQuestion = 10) {
    let categorie = {
        "display": "random",
        "questions": []
    }
    //
    //  pour créer une categorie de questions,
    //    il faut pour chaque question choisir 4 images aux hasard
    //    et en définir une comme celle à trouver
    //
    for (var lim = 0; lim < nbrQuestion; lim++) {
        // on choisi les images aux hasard
        // contient path + noms, on choisira a la fin lequel sera le bon
        let randomImages = [];
        // contient juste les chemins
        let images = [];

        for (var i = 0; i < 4; i++) {
           let l = tools.getRandomInt(0, RawDatas._IMAGES.length);
            randomImages.push(RawDatas._IMAGES[l]);
            images.push(RawDatas._IMAGES[l].path);
        }
        // image à trouver !
        let foundIndex = tools.getRandomInt(0, 3);
        categorie.questions.push(
            {
                "display": randomImages[foundIndex]["ar"],
                "clue": randomImages[foundIndex]["fr"],
                "answer": { // résultat de la dernière réponse, pour encadrer en rouge ou vert l'image cliquée
                    "rightIndex": foundIndex, // index de la réponse correct
                },
                "images": images
            }
        )
    }


    for (var q in categorie.questions) {
        let question = categorie.questions[q];
        question.answer = {
            ...question.answer,
            "clickedIndex": null, // indice de l'image cliquée
            "showBorder": false, // affiche l'encadré ?
            "correct": false, //réponse juste
            "wrong": false, // réponse fausse
            "attempt": 0, // nombre de tentative
        }
    }

    return categorie;
}

*/
