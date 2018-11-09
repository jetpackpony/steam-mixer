import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';
import { getNodeIndexByID } from './utils';

export const addEndpoint = (state, action) => {
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
};

export const addGainNode = (state, action) => {
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
};

export const addConnection = (state, action) => {
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
};

export const deleteNode = (state, action) => {
  var nodeIndex = getNodeIndexByID(action.nodeId, state);
  return R.map((node) => ({
    ...node,
    output: R.without([action.nodeId], node.output)
  }), R.remove(nodeIndex, 1, state));
};

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

export const changeGain = (state, action) => {
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
};
