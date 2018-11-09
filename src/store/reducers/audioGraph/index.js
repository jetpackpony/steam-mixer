import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';
import { ACTION_TYPES } from '../../actions';
import initState from './initialState';
import { deleteConnection } from './handlers';
import { getNodeIndexByID } from './utils';

const audioGraph = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ENDPOINT:
      return [
        ...state,
        {
          "nodeId": action.nodeId,
          "title": action.title,
          "type": action.deviceType,
          "output": [],
          "deviceId": action.device.deviceId
        }
      ];
    case ACTION_TYPES.ADD_GAIN_NODE:
      return [
        ...state,
        {
          "nodeId": action.nodeId,
          "title": action.title,
          "type": NODE_TYPES.AUDIONODE,
          "output": [],
          "constructor": "gain",
          "props": {
            "gain": 1
          }
        }
      ];
    case ACTION_TYPES.ADD_CONNECTION:
      var fromIndex = getNodeIndexByID(action.fromId, state);
      return [
        ...R.slice(0, fromIndex, state),
        {
          ...state[fromIndex],
          output: R.uniq([
            ...state[fromIndex].output,
            action.toId
          ])
        },
        ...R.slice(fromIndex + 1, Infinity, state),
      ];
    case ACTION_TYPES.DELETE_NODE:
      var nodeIndex = getNodeIndexByID(action.nodeId, state);
      return R.map((node) => ({
        ...node,
        output: R.without([action.nodeId], node.output)
      }), R.remove(nodeIndex, 1, state));
    case ACTION_TYPES.DELETE_CONNECTION:
      return deleteConnection(state, action);
    case ACTION_TYPES.CHANGE_GAIN:
      var nodeIndex = getNodeIndexByID(action.nodeId, state);
      return [
        ...R.slice(0, nodeIndex, state),
        {
          ...state[nodeIndex],
          props: {
            ...state[nodeIndex].props,
            gain: action.value
          }
        },
        ...R.slice(nodeIndex + 1, Infinity, state),
      ];
    default:
      return state;
  }
};

export default audioGraph;
export * from './selectors';