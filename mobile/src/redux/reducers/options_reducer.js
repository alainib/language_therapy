import Config from "language_therapy/src/Config";
import { UPDATE_OPTION } from "language_therapy/src/redux/types";

const initState = {
  nbrOfQuestionPerSerie: 10, // nombre de question par défaut par serie
  nbrOfImagePerQuestion: 4, // nombre d'image par question
  imageByImage: false, // on ne fait que un mot à la fois par test
  showClueReversed: true, // affiche la traduction du mot retourné à 90 degrés pour une lettre d'en face
  interfaceSize: Config.textSize.xxl,
  playSoundAfterXWrong: 2,
  displayLg: Config._const.ar,
  level: Config._const.easy,
  manualChooseImage: false // choisi les images d'une serie à la main
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
    default:
      return state;
  }
}
