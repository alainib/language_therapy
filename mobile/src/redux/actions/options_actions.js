/**
 * liste des utilisateurs
 */
import { UPDATE_OPTION, RESET_OPTION } from "language_therapy/src/redux/types";

/**
 * sauvegarde la nouvelle valeur pour une option 
 * @param {*} key : nom de la clé 
 * @param {*} subkey  : nom de la sous clé, uniquement si key est un objet, on passe une attribut ( ==> key[subkey] ) 
 * @param {*} value  : valeur
 * 
 * exemples 
  - action_optionUpdate("optionName", null, false)
  - action_optionUpdate("showTutorialFor", "FeedObservations", true);
 */
export const action_optionUpdate = (key, subkey, value) => {
  return {
    payload: { key, subkey, value },
    type: UPDATE_OPTION
  };
};

export const action_optionReset = () => {
  return {
    payload: null,
    type: RESET_OPTION
  };
};
