import uuidv4 from 'uuid/v4';

export const ACTION_TYPES = {
  TOGGLE_ADD_INPUT_MODAL: "TOGGLE_ADD_INPUT_MODAL",
  TOGGLE_ADD_OUTPUT_MODAL: "TOGGLE_ADD_OUTPUT_MODAL",
  TOGGLE_ADD_CONNECTION_MODAL: "TOGGLE_ADD_CONNECTION_MODAL",
  TOGGLE_ADD_AUDIO_NODE_MODAL: "TOGGLE_ADD_AUDIO_NODE_MODAL",
  TOGGLE_EDIT_AUDIO_NODE_MODAL: "TOGGLE_EDIT_AUDIO_NODE_MODAL",
  ADD_ENDPOINT: "ADD_ENDPOINT",
  ADD_CONNECTION: "ADD_CONNECTION",
  ADD_AUDIO_NODE: "ADD_AUDIO_NODE",
  DELETE_NODE: "DELETE_NODE",
  DELETE_CONNECTION: "DELETE_CONNECTION",
  EDIT_AUDIO_NODE: "EDIT_AUDIO_NODE",
  UPDATE_DEVICE_LIST: "UPDATE_DEVICE_LIST",
  MOVE_NODE: "MOVE_NODE",
  CREATE_CONNECTION_START: "CREATE_CONNECTION_START",
  CREATE_CONNECTION_END: "CREATE_CONNECTION_END",
}

export const toggleAddInputModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_INPUT_MODAL
});

export const toggleAddOutputModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_OUTPUT_MODAL
});

export const toggleAddConnectionModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_CONNECTION_MODAL
});

export const toggleAddAudioNodeModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_AUDIO_NODE_MODAL
});

export const toggleEditAudioNodeModal = (id) => ({
  type: ACTION_TYPES.TOGGLE_EDIT_AUDIO_NODE_MODAL,
  id
});

export const addEndpoint = (deviceType, title, device) => ({
  type: ACTION_TYPES.ADD_ENDPOINT,
  deviceType,
  title,
  device,
  nodeId: uuidv4(),
  coords: {
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 50)
  }
});

export const addAudioNode = (title, typeId) => ({
  type: ACTION_TYPES.ADD_AUDIO_NODE,
  title,
  typeId,
  nodeId: uuidv4(),
  coords: {
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 50)
  }
});

export const addConnection = (fromId, toId) => ({
  type: ACTION_TYPES.ADD_CONNECTION,
  fromId,
  toId
});

export const deleteNode = (nodeId) => ({
  type: ACTION_TYPES.DELETE_NODE,
  nodeId
});

export const deleteConnection = (fromId, toId) => ({
  type: ACTION_TYPES.DELETE_CONNECTION,
  fromId,
  toId
});

export const editAudioNode = (nodeId, props) => ({
  type: ACTION_TYPES.EDIT_AUDIO_NODE,
  nodeId,
  props
});

export const updateDeviceList = (devices) => ({
  type: ACTION_TYPES.UPDATE_DEVICE_LIST,
  devices
});

export const moveNode = (nodeId, newCoords) => ({
  type: ACTION_TYPES.MOVE_NODE,
  nodeId,
  newCoords
});

export const createConnectionStart = (fromNodeId) => ({
  type: ACTION_TYPES.CREATE_CONNECTION_START,
  fromNodeId
});

export const createConnectionEnd = () => ({
  type: ACTION_TYPES.CREATE_CONNECTION_END
});
