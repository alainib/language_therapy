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
      if (!newstate.list[action.payload.currentUser][id]) {
        newstate.list[action.payload.currentUser][id] = [];
      }

      // on enlever de chaques réponses attempt,clickedIndex,correct,wrong,showBorder
      let serieCleaned = action.payload.currentSerie;
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

      console.log("serieCleaned", serieCleaned);

      newstate.list[action.payload.currentUser][id].push({
        id: id,
        date: tools.getTodayDate(true),
        serie: serieCleaned,
        score: action.payload.score
      });

    case REMOVE_SERIE_FROM_USER:

    case CLEAR_SERIES_FROM_USER:
      return newstate;

    default:
      return state;
  }
}
