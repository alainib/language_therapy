import RawDatas from "language_therapy/ressources/data";

import * as tools from "language_therapy/src/tools";

import Config from "language_therapy/src/Config";

import { allCategoriesNames, randomSerie, checkGoodImagesMobile } from "./serieHelper";
import { action_adderrorlog } from "language_therapy/src/redux/actions";
import configureStore from "language_therapy/src/redux/store";
const { store } = configureStore();

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
  let res = randomSerie(RawDatas._IMAGES, categoriesName, nbrQuestion, nbrOfImagePerItem, displayLg, level, selectedImages);

  if (categoriesName.length === 1 && !selectedImages) {
    try {
      const errors = checkGoodImagesMobile(level, nbrOfImagePerItem, res.questions, categoriesName, RawDatas._IMAGES);

      if (errors.length > 0) {
        let logme = {
          categoriesName,
          nbrQuestion,
          nbrOfImagePerItem,
          displayLg,
          level,
          selectedImages,
          results: res,
          errors
        };
        store.dispatch(action_adderrorlog(logme));
      }
    } catch (error) {}
  }

  return res;
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
