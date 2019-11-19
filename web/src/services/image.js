import Config from "../Config";
import * as axios from "./axios";

let _allSeriesName = null;
/**
 * retourne la liste des noms de toutes les series disponibles
 */
export async function image_AllSeriesNames() {
  if (_allSeriesName) {
    return _allSeriesName;
  } else {
    const url = "series";

    let status, data;
    try {
      const response = await axios.instance.get(url);
      status = response.status;
      data = response.data;
    } catch (error) {
      console.error(error);
      status = 404;
    }
    if (status == 200) {
      _allSeriesName = data;
      return data;
    } else {
      return false;
    }
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
 *
 * si c'est niveau facile alors il ne faut pas que les images retournés soit de la meme serie du tout
 * si c'est niveau moyen alors les images sont un mélanges d'autres series et celle choisie
 * si c'est niveau dur alors les images ne sont que de la serie choisie
 */
export async function image_randomSerie(
  serieName,
  nbrQuestion = 10,
  nbrOfImagePerQuestion = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  const url = "serie";

  let status, data;
  try {
    const response = await axios.instance.post(
      url,
      {
        serieName,
        nbrQuestion,
        nbrOfImagePerQuestion,
        displayLg,
        level,
        selectedImages
      },
      axios.postConfig
    );
    status = response.status;
    data = response.data;
  } catch (error) {
    console.error(error);
    status = 404;
  }
  if (status == 200) {
    return data;
  } else {
    return false;
  }
}
