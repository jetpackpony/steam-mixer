import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['audioGraph']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(logger)
  ));
  const persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;