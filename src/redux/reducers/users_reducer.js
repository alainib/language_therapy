import _ from "lodash";
import {
  SETCURRENT_USER,
  ADD_USER,
  REMOVE_USER,
  ADD_SERIE_TO_USER,
  REMOVE_SERIE_FROM_USER,
  CLEAR_SERIES_FROM_USER
} from "number_therapy/src/redux/types";

import * as tools from "number_therapy/src/tools";

/**
 * pour stocker la liste des observations locales
 */

export default function(state = { current: null, list: {} }, action) {
  let { current, list } = state;
  console.log(
    JSON.stringify({
      type: action.type,
      payload: action.payload,
      state
    })
  );
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
          newstate.list[action.payload] = [];
        }
        return newstate;
      } else {
        return state;
      }

    case REMOVE_USER:
      return state;

    case ADD_SERIE_TO_USER:
      newstate = { ...state };

      newstate.list[action.payload.currentUser].push({
        date: tools.getTodayDate(),
        currentSerie: action.payload.currentSerie,
        score: action.payload.score
      });

    case REMOVE_SERIE_FROM_USER:

    case CLEAR_SERIES_FROM_USER:
      return newstate;

    default:
      return state;
  }
}
