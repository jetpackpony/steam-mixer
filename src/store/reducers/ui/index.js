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
    case ACTION_TYPES.TOGGLE_ADD_AUDIO_NODE_MODAL:
      return {
        ...state,
        addAudioNodeOpen: !state.addAudioNodeOpen
      };
    case ACTION_TYPES.TOGGLE_EDIT_AUDIO_NODE_MODAL:
      return {
        ...state,
        editAudioNodeOpen: !state.editAudioNodeOpen,
        editAudioNodeId: action.id
      };
    case ACTION_TYPES.TOGGLE_HELP_MODAL:
      return {
        ...state,
        helpOpen: !state.helpOpen
      };
    case ACTION_TYPES.CREATE_CONNECTION_START:
      return {
        ...state,
        drawingConnection: true,
        drawingConnectionNodeId: action.fromNodeId,
      };
    case ACTION_TYPES.CREATE_CONNECTION_END:
      return {
        ...state,
        drawingConnection: false,
        drawingConnectionNodeId: null,
      };
    default:
      return state;
  }
};

export default ui;
export * from './selectors';