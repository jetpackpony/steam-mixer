import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';
import { getNodeIndexByID } from './utils';
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
      "deviceId": action.device.deviceId
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
      "props": pluginUtils.getDefaultPropsForPlugin(action.typeId)
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


const isIn = R.flip(R.contains);
/*
 * [a] -> (a -> Boolean)
 */
const isDeviceNilOrActive = (activeDeviceIds) => (
  R.converge(
    R.or,
    [R.isNil, isIn(activeDeviceIds)]
  )
);
const isNodeActive = R.curry((activeDeviceIds, node) =>
  (isDeviceNilOrActive(activeDeviceIds)(node.deviceId))
    ? node
    : null
);

/*
 * [String] -> {k:v} -> {k:v}
 * Removes all the inactive outputs from a single node's object
 */
const updateSingleNodeOutputs = (activeNodes) => (
  R.evolve({
    output: R.filter(isIn(activeNodes))
  })
);

/*
 * [String] -> [a] -> [a]
 * Takes a list of active node ids and a list of nodes. Returns a new list of nodes with 
 * only active nodes remaining in the outputs
 */
const updateNodesOutputs = R.useWith(R.map, [updateSingleNodeOutputs]);

const getActiveNodes = R.pluck("nodeId");

/*
 * [a] -> [a]
 * Takes a list of nodes. Goes over each node and removes outputs that are not present
 * in the list of nodes
 */
const removeInactiveOutputs = R.converge(updateNodesOutputs, [getActiveNodes, R.identity]);
export const updateDeviceList = (state, action) => {
  const isNodeActiveApplied = isNodeActive(R.pluck("deviceId", action.devices));
  return R.compose(
    removeInactiveOutputs,
    R.filter(isNodeActiveApplied)
  )(state);
};