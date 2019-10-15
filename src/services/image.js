import RawDatas from "language_therapy/ressources/data";

import * as tools from "language_therapy/src/tools";

import Config from "language_therapy/src/Config";

/**
 * retourne une image au hasard parmis une serie
 * @param {*} serieName nom de la serie
 * @param {*} imagesSrc  images à piocher parmis
 * @param {*} deleteItem efface ou non l'image choisi
 */
function randomImageFromSerie(serieName, imagesSrc, deleteItem = false) {
  if (
    imagesSrc == null ||
    imagesSrc == undefined ||
    imagesSrc[serieName].length < 1
  ) {
    console.error("wrong imagesSrc param data");
    return null;
  }

  let l = tools.getRandomInt(0, imagesSrc[serieName].length - 1);
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
 * retourne un nom de serie au hasard différent de celui passé en parametre
 * @param array of string, exclude ces series
 */
function randomSerieName(exclude = []) {
  let _names = [];

  for (var i in _allSeriesName) {
    if (!exclude.includes(_allSeriesName[i])) {
      _names.push(_allSeriesName[i]);
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

//pour certaines series on ne prend que les images de la même serie
let _unmixedSeries = ["nombres-fr", "nombres-ar"];

let _allSeriesName = null;
/**
 * retourne la liste des noms de toutes les series disponibles
 */
export function image_AllSeriesNames() {
  if (_allSeriesName) {
    return _allSeriesName;
  } else {
    let _names = [];
    for (var cat in RawDatas._IMAGES) {
      _names.push(cat);
    }

    _allSeriesName = _names;
    return _allSeriesName;
  }
}

/**
 * crée une serie d'exercice depuis un nom de serie donnée
 * @param string serieName nom de la serie pour les réponses justes
 * @param int nbrQuestion : nombre de question
 * @param int nbrOfImagePerQuestion : nombre d'image par question
 * @param string displayLg : langue du mot à afficher pour chaque question ( FR ou AR )
 * @param string level : easy = on utilise des images que tu meme serie, middle = on prend tjrs la même serie pour l'image juste et random pour les autres
 * @param array selectedImages : array of images,
 *
 * si selectedImages not null alors ces images seront utilisées comme image à trouver
 */
export function image_randomSerie(
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

  let copyDatas = tools.clone(RawDatas);

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
        ...randomImageFromSerie(serieName, copyDatas._IMAGES, true),
        right: true
      });
    }
    if (level == Config._const.easy) {
      // et 3(ou nbrOfImagePerQuestion-1) autres images d'autres series
      for (var i = 1; i < nbrOfImagePerQuestion; i++) {
        let catTmp = null;

        // si on est dans une serie a ne pas mélanger
        if (_unmixedSeries.includes(serieName)) {
          catTmp = serieName;
        } else {
          let excluded = [];
          catTmp = randomSerieName([excluded, ..._unmixedSeries]);
        }

        let repeat = 0;

        while (repeat < 10) {
          let imgTmp;
          if (_unmixedSeries.includes(serieName)) {
            let copyDatasTmp = tools.clone(RawDatas);
            imgTmp = randomImageFromSerie(catTmp, copyDatasTmp._IMAGES, false);
          } else {
            imgTmp = randomImageFromSerie(catTmp, copyDatas._IMAGES, false);
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
      // et 3(ou nbrOfImagePerQuestion) autres images de la même serie
      for (var i = 1; i < nbrOfImagePerQuestion; i++) {
        let repeat = 0;
        while (repeat < 10) {
          let imgTmp = randomImageFromSerie(
            serieName,
            copyDatas._IMAGES,
            false
          );
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
    serie.questions.push(questionTmp);
  }

  return serie;
}

// retourne toutes les images d'une serie
// utilisé pour choix images à la main
export function image_allImagesFromSerie(serieName) {
  return tools.clone(RawDatas._IMAGES[serieName]);
}

/**
 * creée une serie pour trainSerie à partir d'images selectionnées à la main
 * @param string serieName
 * @param array selectedImages
 */
export function image_serieFromImages(
  selectedImages,
  serieName,
  nbrQuestion,
  nbrOfImagePerQuestion,
  displayLg,
  level
) {
  return image_randomSerie(
    serieName,
    nbrQuestion,
    nbrOfImagePerQuestion,
    displayLg,
    level,
    selectedImages
  );
}

/*
/////////////   unused
// random depuis tt les series
export function createMotImageSerie(nbrQuestion = 10) {
    let serie = {
        "display": "random",
        "questions": []
    }
    //
    //  pour créer une serie de questions,
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
        serie.questions.push(
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


    for (var q in serie.questions) {
        let question = serie.questions[q];
        question.answer = {
            ...question.answer,
            "clickedIndex": null, // indice de l'image cliquée
            "showBorder": false, // affiche l'encadré ?
            "correct": false, //réponse juste
            "wrong": false, // réponse fausse
            "attempt": 0, // nombre de tentative
        }
    }

    return serie;
}

*/
