import { createStore, applyMiddleware } from 'redux';
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
  const store = createStore(persistedReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;