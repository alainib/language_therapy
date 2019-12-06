import Config from "../../Config";
import { UPDATE_OPTION, RESET_OPTION } from "../types";

const initState = {
  nbrOfItemPerSerie: 10, // nombre d'item par défaut par serie
  nbrOfImagePerItem: 4, // nombre d'image par item
  imageByImage: false, // on ne fait que un mot à la fois par test
  imageByImageDisplayName: true, // si on est en mode image par image on peut soit afficher le nom soit des _ _ _ à la place
  showClueReversed: true, // affiche la traduction du mot retourné à 90 degrés pour une lettre d'en face
  interfaceSize: Config.textSize.l,
  playSoundAfterXWrong: 2,
  displayLg: Config._const.ar,
  level: Config._const.easy,
  manualChooseImage: false, // choisi les images d'une serie à la main
  multiCategories: false // choisir les series soit meme
};

export default function(state = initState, action) {
  switch (action.type) {
    case UPDATE_OPTION:
      let newState = { ...state };
      if (action.payload.subkey == null) {
        newState[action.payload.key] = action.payload.value;
      } else {
        newState[action.payload.key][action.payload.subkey] = action.payload.value;
      }
      return newState;
    case RESET_OPTION:
      return { ...initState };
    default:
      return state;
  }
}
