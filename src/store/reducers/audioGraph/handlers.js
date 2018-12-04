import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';
import {
  getNodeIndexByID,
  removeDeadOutputsFromList,
  removeNodesWithDeadDevices
} from './utils';
import { bindPluginUtils } from '../../../utils';
import plugins from '../../../plugins';
const pluginUtils = bindPluginUtils(plugins);

export const addEndpoint = (state, action) => {
  return [
    ...state,
    {
      "nodeId": action.nodeId,
      "title": action.title,
      "type": action.deviceType,
      "output": [],
      "deviceId": action.device.deviceId,
      coords: action.coords
    }
  ];
};

export const addAudioNode = (state, action) => {
  return [
    ...state,
    {
      "nodeId": action.nodeId,
      "title": action.title,
      "type": NODE_TYPES.AUDIONODE,
      "output": [],
      "nodeTypeId": action.typeId,
      "props": pluginUtils.getDefaultPropsForPlugin(action.typeId),
      coords: action.coords
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

export const editAudioNode = (state, action) => {
  const nodeIndex = getNodeIndexByID(action.nodeId, state);
  return [
    ...R.slice(0, nodeIndex, state),
    {
      ...state[nodeIndex],
      props: action.props
    },
    ...R.slice(nodeIndex + 1, Infinity, state),
  ];
};

export const updateDeviceList = (state, action) => {
  return R.compose(
    removeDeadOutputsFromList,
    removeNodesWithDeadDevices(action.devices)
  )(state);
};

export const moveNode = (state, action) => {
  const nodeIndex = getNodeIndexByID(action.nodeId, state);
  return [
    ...R.slice(0, nodeIndex, state),
    {
      ...state[nodeIndex],
      coords: action.newCoords
    },
    ...R.slice(nodeIndex + 1, Infinity, state),
  ];
};