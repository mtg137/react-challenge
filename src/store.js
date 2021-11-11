import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createRootReducer from './state/root.reducer';

let store;

export const history = createBrowserHistory()

export default (onCompletion) => {
  const persistConfig = {
    key: 'root-v3',
    storage,
    blacklist: [],
  };

  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

  store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware(), logger, routerMiddleware(history)],
    devTools: 'development',
  });

  const persist = persistStore(store, null, onCompletion);

  return { store, persist };
}

export const getStore = () => store;
