import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import reducer from './reducers';
import { storageRehydrated } from './actions';

const rootConfig = {
  key: 'root',
  storage,
  whitelist: ['audioGraph', 'ui'],
  transforms: [
    createWhitelistFilter('ui', ['persistent']),
  ]
};

const persistedReducer = persistReducer(rootConfig, reducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(logger));
  const onReducersRehydrated = () => {
    store.dispatch(storageRehydrated());
  };
  const persistor = persistStore(store, null, onReducersRehydrated);
  return { store, persistor };
};
export default configureStore;