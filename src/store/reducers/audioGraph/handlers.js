import * as R from 'ramda';
import { getNodeIndexByID } from './utils';

export const deleteConnection = (state, action) => {
  const fromIndex = getNodeIndexByID(action.fromId, state);
  return [
    ...R.slice(0, fromIndex, state),
    {
      ...state[fromIndex],
      output: R.without([action.toId], state[fromIndex].output)
    },
    ...R.slice(fromIndex + 1, Infinity, state),
  ];
};