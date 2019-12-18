import { ADD_ERRORLOG, RESET_ERRORLOG } from "language_therapy/src/redux/types";

export const action_adderrorlog = value => {
  return {
    payload: value,
    type: ADD_ERRORLOG
  };
};

export const action_reseterrorlog = value => {
  return {
    type: RESET_ERRORLOG
  };
};
