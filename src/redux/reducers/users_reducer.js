import _ from "lodash";
import {
  SETCURRENT_USER,
  ADD_USER,
  REMOVE_USER,
  ADD_SERIE_TO_USER,
  REMOVE_SERIE_FROM_USER,
  CLEAR_SERIES_FROM_USER
} from "language_therapy/src/redux/types";

import * as tools from "language_therapy/src/tools";

/**
 * pour stocker la liste des observations locales
 */

export default function(state = { current: null, list: {} }, action) {
  let { list } = state;

  let newstate = { current: null, list: {} };
  switch (action.type) {
    case SETCURRENT_USER:
      newstate = { ...state, current: action.payload };
      return newstate;

    case ADD_USER:
      if (action.payload && action.payload.length > 3) {
        newstate["current"] = action.payload;
        newstate["list"] = { ...list };

        if (newstate.list[action.payload] == undefined) {
          newstate.list[action.payload] = {};
        }
        return newstate;
      } else {
        return state;
      }

    case REMOVE_USER:
      newstate["list"] = { ...list };
      delete newstate["list"][action.payload];
      return newstate;

    case ADD_SERIE_TO_USER:
      newstate = { ...state };

      let id = action.payload.id; //? action.payload.id : Date.now();
      if (!newstate.list[action.payload.user][id]) {
        newstate.list[action.payload.user][id] = [];
      }

      // on enlever de chaques réponses attempt,clickedIndex,correct,wrong,showBorder
      let serieCleaned = action.payload.serie;
      for (var q in serieCleaned.questions) {
        serieCleaned.questions[q].answer = {
          rightIndex: serieCleaned.questions[q].answer.rightIndex,
          attempt: 0,
          clickedIndex: null,
          correct: false,
          wrong: false,
          showBorder: false
        };
      }

      newstate.list[action.payload.user][id].push({
        id: id,
        date: tools.getTodayDate(true),
        serie: serieCleaned,
        results: action.payload.results
      });
      // return newstate ne declenche pas le refresh de <Suivi>, trop nested peut etre
      console.log(newstate);
      return tools.clone(newstate);

    case REMOVE_SERIE_FROM_USER:
      return newstate;
    case CLEAR_SERIES_FROM_USER:
      return newstate;

    default:
      return state;
  }
}
