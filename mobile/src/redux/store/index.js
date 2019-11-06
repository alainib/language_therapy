import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "language_therapy/src/redux/reducers";

const config = {
  key: "root",
  storage,
  timeout: null
};

const middleware = [];

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {});
// reset l'application + store complement en effacant les données stockées sur le tel
// persistor.purge();

const configureStore = () => {
  return { persistor, store };
};

export default configureStore;
