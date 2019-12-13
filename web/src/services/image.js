import Config from "Config";
import * as axios from "services/axios";

let _allCategoriesName = null;
/**
 * crée une categorie d'exercice depuis un nom de categorie donnée
 * @param string categorieName nom de la categorie pour les réponses justes
 * @param int nbrQuestion : nombre de question
 * @param int nbrOfImagePerQuestion : nombre d'image par question
 * @param string displayLg : langue du mot à afficher pour chaque question ( FR ou AR )
 * @param string level : easy = on utilise des images que tu meme categorie, middle = on prend tjrs la même categorie pour l'image juste et random pour les autres
 * @param array selectedImages : array of images,
 *
 * si selectedImages not null alors ces images seront utilisées comme image à trouver
 *
 * si c'est niveau facile alors il y a 1 seule image de la catégorie choisie
 * si c'est niveau moyen alors il y a la moitié des images de la catégorie choisie
 * si c'est niveau dur alors toutes les images sont de la catégories choisie
 */
export async function image_randomSerie(
  token,
  categorieName,
  nbrQuestion = 10,
  nbrOfImagePerQuestion = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  /* console.log("image randome", {
    categorieName,
    nbrQuestion,
    nbrOfImagePerQuestion,
    displayLg,
    level,
    selectedImages,
    token
  });*/
  const url = `/categorie`;

  let status, data;
  try {
    const response = await axios.instance.post(
      url,
      {
        token: token,
        categorieName,
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
  if (status === 200) {
    return data;
  } else {
    return false;
  }
}

/**
 * retourne la liste des noms de toutes les categories disponibles
 */
export async function image_AllCategoriesNames() {
  if (_allCategoriesName) {
    return _allCategoriesName;
  } else {
    const url = "/categories";

    let status, data;
    try {
      const response = await axios.instance.get(url);
      status = response.status;
      data = response.data;
    } catch (error) {
      console.error(error);
      status = 404;
    }
    if (status === 200) {
      _allCategoriesName = data;
      return data;
    } else {
      return false;
    }
  }
}
