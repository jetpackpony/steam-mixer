import { ACTION_TYPES } from "../../actions";
import initState from './initialState';

const ui = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_ADD_INPUT_MODAL:
      return {
        ...state,
        addInputOpen: !state.addInputOpen
      };
    case ACTION_TYPES.TOGGLE_ADD_OUTPUT_MODAL:
      return {
        ...state,
        addOutputOpen: !state.addOutputOpen
      };
    case ACTION_TYPES.TOGGLE_ADD_CONNECTION_MODAL:
      return {
        ...state,
        addConnectionOpen: !state.addConnectionOpen
      };
    case ACTION_TYPES.TOGGLE_EDIT_GAIN_MODAL:
      return {
        ...state,
        editGainOpen: !state.editGainOpen,
        editGainId: action.id
      };
    case ACTION_TYPES.TOGGLE_ADD_AUDIO_NODE_MODAL:
      return {
        ...state,
        addAudioNodeOpen: !state.addAudioNodeOpen
      };
    case ACTION_TYPES.TOGGLE_EDIT_COMPRESSOR_MODAL:
      return {
        ...state,
        editCompressorOpen: !state.editCompressorOpen,
        editCompressorId: action.id
      };
    default:
      return state;
  }
};

export default ui;
export * from './selectors';