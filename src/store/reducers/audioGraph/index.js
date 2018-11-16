import * as R from 'ramda';
import { ACTION_TYPES } from '../../actions';
import initState from './initialState';
import {
  addEndpoint, addGainNode, addConnection,
  deleteNode, deleteConnection, changeGain,
  updateDeviceList, addCompressorNode,
  changeCompressor
} from './handlers';

const handlersMap = {
  [ACTION_TYPES.ADD_ENDPOINT]: addEndpoint,
  [ACTION_TYPES.ADD_GAIN_NODE]: addGainNode,
  [ACTION_TYPES.ADD_COMPRESSOR_NODE]: addCompressorNode,
  [ACTION_TYPES.ADD_CONNECTION]: addConnection,
  [ACTION_TYPES.DELETE_NODE]: deleteNode,
  [ACTION_TYPES.DELETE_CONNECTION]: deleteConnection,
  [ACTION_TYPES.CHANGE_GAIN]: changeGain,
  [ACTION_TYPES.CHANGE_COMPRESSOR]: changeCompressor,
  [ACTION_TYPES.UPDATE_DEVICE_LIST]: updateDeviceList
}

const stateIdentity = (state) => state;
const getHandler = (actionType) => (
  handlersMap[actionType] || stateIdentity
);

const audioGraph = (state = initState, action) => {
  return getHandler(action.type)(state, action);
};

export default audioGraph;
export * from './selectors';