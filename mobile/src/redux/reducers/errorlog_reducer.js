import { ADD_ERRORLOG, RESET_ERRORLOG } from "language_therapy/src/redux/types";

export default function(state = [], action) {
  switch (action.type) {
    case RESET_ERRORLOG:
      return [];
    case ADD_ERRORLOG:
      return [...state, action.payload];
    default:
      return state;
  }
}
