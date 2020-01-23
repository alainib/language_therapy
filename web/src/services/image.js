import Config from "Config";
import * as axios from "services/axios";

let _allCategoriesName = null;
/**
 * crée une catégorie d'exercice depuis un nom donnée
 * @param string categorieName nom de la catégorie pour les réponses justes
 * @param int nbrItem : nombre de question
 * @param int nbrOfImagePerItem : nombre d'image par question
 * @param string displayLg : langue du mot à afficher pour chaque question ( FR ou AR )
 * @param string level : easy = on utilise des images que tu meme catégorie, middle = on prend tjrs la même catégorie pour l'image juste et random pour les autres
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
  nbrItem = 10,
  nbrOfImagePerItem = 4,
  displayLg = Config._const.ar,
  level = Config._const.easy,
  selectedImages = null
) {
  const url = `/categorie`;

  let status, data;
  try {
    const response = await axios.instance.post(
      url,
      {
        token: token,
        categorieName,
        nbrItem,
        nbrOfImagePerItem,
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
 * retourne la liste des noms de toutes les catégories disponibles
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

/**
 * retourne toute les images d'une categorie
 */
export async function allImagesFromCategorie(categorie) {
  const url = "/allimagesfromcategories/" + categorie;

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
    return data;
  } else {
    return false;
  }
}
