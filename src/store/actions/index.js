import uuidv4 from 'uuid/v4';

const ACTION_TYPES = {
  TOGGLE_ADD_INPUT_MODAL: "TOGGLE_ADD_INPUT_MODAL",
  TOGGLE_ADD_OUTPUT_MODAL: "TOGGLE_ADD_OUTPUT_MODAL",
  TOGGLE_ADD_CONNECTION_MODAL: "TOGGLE_ADD_CONNECTION_MODAL",
  TOGGLE_ADD_AUDIO_NODE_MODAL: "TOGGLE_ADD_AUDIO_NODE_MODAL",
  TOGGLE_EDIT_AUDIO_NODE_MODAL: "TOGGLE_EDIT_AUDIO_NODE_MODAL",
  TOGGLE_NODE_CONTEXT_MENU: "TOGGLE_NODE_CONTEXT_MENU",
  TOGGLE_CONNECTION_CONTEXT_MENU: "TOGGLE_CONNECTION_CONTEXT_MENU",
  ADD_ENDPOINT: "ADD_ENDPOINT",
  ADD_CONNECTION: "ADD_CONNECTION",
  ADD_AUDIO_NODE: "ADD_AUDIO_NODE",
  DELETE_NODE: "DELETE_NODE",
  DELETE_CONNECTION: "DELETE_CONNECTION",
  EDIT_AUDIO_NODE: "EDIT_AUDIO_NODE",
  UPDATE_DEVICE_LIST: "UPDATE_DEVICE_LIST",
}

const toggleAddInputModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_INPUT_MODAL
});

const toggleAddOutputModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_OUTPUT_MODAL
});

const toggleAddConnectionModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_CONNECTION_MODAL
});

const toggleAddAudioNodeModal = () => ({
  type: ACTION_TYPES.TOGGLE_ADD_AUDIO_NODE_MODAL
});

const toggleEditAudioNodeModal = (id) => ({
  type: ACTION_TYPES.TOGGLE_EDIT_AUDIO_NODE_MODAL,
  id
});

const toggleNodeContextMenu = (id = null, pointerCoords = { x: 0, y: 0 }) => ({
  type: ACTION_TYPES.TOGGLE_NODE_CONTEXT_MENU,
  id,
  pointerCoords
});

const toggleConnectionContextMenu =
  (nodeIds = { fromId: null, toId: null }, pointerCoords = { x: 0, y: 0 }) => ({
    type: ACTION_TYPES.TOGGLE_CONNECTION_CONTEXT_MENU,
    nodeIds,
    pointerCoords
  });

const addEndpoint = (deviceType, title, device) => ({
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

const addAudioNode = (title, typeId) => ({
  type: ACTION_TYPES.ADD_AUDIO_NODE,
  title,
  typeId,
  nodeId: uuidv4(),
  coords: {
    x: Math.random() * (window.innerWidth - 50),
    y: Math.random() * (window.innerHeight - 50)
  }
});

const addConnection = (fromId, toId) => ({
  type: ACTION_TYPES.ADD_CONNECTION,
  fromId,
  toId
});

const deleteNode = (nodeId) => ({
  type: ACTION_TYPES.DELETE_NODE,
  nodeId
});

const deleteConnection = (fromId, toId) => ({
  type: ACTION_TYPES.DELETE_CONNECTION,
  fromId,
  toId
});

const editAudioNode = (nodeId, props) => ({
  type: ACTION_TYPES.EDIT_AUDIO_NODE,
  nodeId,
  props
});


const updateDeviceList = (devices) => ({
  type: ACTION_TYPES.UPDATE_DEVICE_LIST,
  devices
});

export {
  ACTION_TYPES,
  toggleAddInputModal,
  toggleAddOutputModal,
  toggleAddConnectionModal,
  toggleAddAudioNodeModal,
  toggleEditAudioNodeModal,
  toggleNodeContextMenu,
  toggleConnectionContextMenu,
  addEndpoint,
  addAudioNode,
  addConnection,
  deleteNode,
  deleteConnection,
  editAudioNode,
  updateDeviceList,
}
