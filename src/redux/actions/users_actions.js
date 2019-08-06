/**
 * liste des utilisateurs
 */
import {
  ADD_USER,
  REMOVE_USER,
  SETCURRENT_USER,
  ADD_SERIE_TO_USER,
  REMOVE_SERIE_FROM_USER,
  CLEAR_SERIES_FROM_USER
} from "number_therapy/src/redux/types";

export const action_addUser = username => {
  return {
    payload: username,
    type: ADD_USER
  };
};

export const action_setCurrentUser = username => {
  return {
    payload: username,
    type: SETCURRENT_USER
  };
};

export const action_removeUser = username => {
  return {
    payload: username,
    type: REMOVE_USER
  };
};

export const action_addSerieToUser = data => {
  return {
    payload: data,
    type: ADD_SERIE_TO_USER
  };
};

export const action_removeSerieFromUser = data => {
  return {
    payload: data,
    type: REMOVE_SERIE_FROM_USER
  };
};

export const action_clearSeriesFromUser = username => {
  return {
    payload: username,
    type: CLEAR_SERIES_FROM_USER
  };
};
