import { createStore } from 'redux';
import reducer from './reducers';

const makeStore = () => {
  let store = createStore(reducer);
  return store;
};
export default makeStore;