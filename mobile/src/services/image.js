import RawDatas from "language_therapy/ressources/data";

import * as tools from "language_therapy/src/tools";

import Config from "language_therapy/src/Config";

import { allCategoriesNames, randomSerie } from "./serieHelper";

/**
 * retourne la liste des noms de toutes les categories disponibles
 */
export function image_AllCategoriesNames() {
  return allCategoriesNames(RawDatas._IMAGES);
}

export function image_randomSerie(
  categoriesName,
  nbrQuestion = 10,
  nbrOfImagePerItem = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  return randomSerie(RawDatas._IMAGES, categoriesName, nbrQuestion, nbrOfImagePerItem, displayLg, level, selectedImages);
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
  return image_randomSerie([categorieName], nbrQuestion, nbrOfImagePerItem, displayLg, level, selectedImages);
}
