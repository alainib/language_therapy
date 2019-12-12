/**
 * liste des utilisateurs
 */
import {
  ADD_USER,
  REMOVE_USER,
  SETCURRENT_USER,
  ADD_CATEGORIE_TO_USER,
  REMOVE_CATEGORIE_FROM_USER,
  CLEAR_CATEGORIES_FROM_USER
} from "language_therapy/src/redux/types";

export const action_addUser = username => {
  return {
    payload: username.trim(),
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

export const action_addCategorieToUser = data => {
  return {
    payload: data,
    type: ADD_CATEGORIE_TO_USER
  };
};

export const action_removeCategorieFromUser = data => {
  return {
    payload: data,
    type: REMOVE_CATEGORIE_FROM_USER
  };
};

export const action_clearCategoriesFromUser = username => {
  return {
    payload: username,
    type: CLEAR_CATEGORIES_FROM_USER
  };
};
