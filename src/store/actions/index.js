import uuidv4 from 'uuid/v4';

const ACTION_TYPES = {
  TOGGLE_ADD_INPUT_MODAL: "TOGGLE_ADD_INPUT_MODAL",
  TOGGLE_ADD_OUTPUT_MODAL: "TOGGLE_ADD_OUTPUT_MODAL",
  TOGGLE_ADD_CONNECTION_MODAL: "TOGGLE_ADD_CONNECTION_MODAL",
  TOGGLE_EDIT_GAIN_MODAL: "TOGGLE_EDIT_GAIN_MODAL",
  ADD_ENDPOINT: "ADD_ENDPOINT",
  ADD_GAIN_NODE: "ADD_GAIN_NODE",
  ADD_CONNECTION: "ADD_CONNECTION",
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

const toggleEditGainModal = (id) => ({
  type: ACTION_TYPES.TOGGLE_EDIT_GAIN_MODAL,
  id
});

const addEndpoint = (deviceType, title, device) => ({
  type: ACTION_TYPES.ADD_ENDPOINT,
  deviceType,
  title,
  device,
  nodeId: uuidv4()
});

const addGainNode = () => ({
  type: ACTION_TYPES.ADD_GAIN_NODE,
  title: "Gain",
  nodeId: uuidv4()
});

const addConnection = (fromId, toId) => ({
  type: ACTION_TYPES.ADD_CONNECTION,
  fromId,
  toId
});

export {
  ACTION_TYPES,
  toggleAddInputModal,
  toggleAddOutputModal,
  toggleAddConnectionModal,
  toggleEditGainModal,
  addEndpoint,
  addGainNode,
  addConnection,
}
