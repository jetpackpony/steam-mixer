import uuidv4 from 'uuid/v4';

const ACTION_TYPES = {
  TOGGLE_ADD_INPUT_MODAL: "TOGGLE_ADD_INPUT_MODAL",
  TOGGLE_ADD_OUTPUT_MODAL: "TOGGLE_ADD_OUTPUT_MODAL",
  TOGGLE_ADD_CONNECTION_MODAL: "TOGGLE_ADD_CONNECTION_MODAL",
  TOGGLE_ADD_AUDIO_NODE_MODAL: "TOGGLE_ADD_AUDIO_NODE_MODAL",
  TOGGLE_EDIT_GAIN_MODAL: "TOGGLE_EDIT_GAIN_MODAL",
  TOGGLE_EDIT_COMPRESSOR_MODAL: "TOGGLE_EDIT_COMPRESSOR_MODAL",
  ADD_ENDPOINT: "ADD_ENDPOINT",
  ADD_CONNECTION: "ADD_CONNECTION",
  ADD_AUDIO_NODE: "ADD_AUDIO_NODE",
  DELETE_NODE: "DELETE_NODE",
  DELETE_CONNECTION: "DELETE_CONNECTION",
  CHANGE_GAIN: "CHANGE_GAIN",
  CHANGE_COMPRESSOR: "CHANGE_COMPRESSOR",
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

const toggleEditGainModal = (id) => ({
  type: ACTION_TYPES.TOGGLE_EDIT_GAIN_MODAL,
  id
});

const toggleEditCompressorModal = (id) => ({
  type: ACTION_TYPES.TOGGLE_EDIT_COMPRESSOR_MODAL,
  id
});

const addEndpoint = (deviceType, title, device) => ({
  type: ACTION_TYPES.ADD_ENDPOINT,
  deviceType,
  title,
  device,
  nodeId: uuidv4()
});

const addAudioNode = (title, typeId) => ({
  type: ACTION_TYPES.ADD_AUDIO_NODE,
  title,
  typeId,
  nodeId: uuidv4()
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

const changeGain = (nodeId, value) => ({
  type: ACTION_TYPES.CHANGE_GAIN,
  nodeId,
  value
});

const changeCompressor = (nodeId, props) => ({
  type: ACTION_TYPES.CHANGE_COMPRESSOR,
  nodeId,
  attack: props.attack,
  knee: props.knee,
  ratio: props.ratio,
  release: props.release,
  threshold: props.threshold
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
  toggleEditGainModal,
  toggleEditCompressorModal,
  addEndpoint,
  addAudioNode,
  addConnection,
  deleteNode,
  deleteConnection,
  changeGain,
  changeCompressor,
  updateDeviceList,
}
