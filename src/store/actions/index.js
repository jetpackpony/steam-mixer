
const ACTION_TYPES = {
  TOGGLE_ADD_INPUT_MODAL: "TOGGLE_ADD_INPUT_MODAL",
  TOGGLE_ADD_OUTPUT_MODAL: "TOGGLE_ADD_OUTPUT_MODAL",
  TOGGLE_ADD_CONNECTION_MODAL: "TOGGLE_ADD_CONNECTION_MODAL",
  TOGGLE_EDIT_GAIN_MODAL: "TOGGLE_EDIT_GAIN_MODAL",
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

export {
  ACTION_TYPES,
  toggleAddInputModal,
  toggleAddOutputModal,
  toggleAddConnectionModal,
  toggleEditGainModal,
}
