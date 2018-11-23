import { MODAL_TYPES } from "../../constants";

const modalsMap = {
  [MODAL_TYPES.ADD_INPUT]: "addInputOpen",
  [MODAL_TYPES.ADD_OUTPUT]: "addOutputOpen",
  [MODAL_TYPES.ADD_CONNECTION]: "addConnectionOpen",
  [MODAL_TYPES.ADD_AUDIO_NODE]: "addAudioNodeOpen",
  [MODAL_TYPES.EDIT_AUDIO_NODE]: "editAudioNodeOpen",
  [MODAL_TYPES.NODE_CONTEXT_MENU]: "nodeContextMenuOpen",
  [MODAL_TYPES.CONNECTION_CONTEXT_MENU]: "connectionContextMenuOpen",
};
export const getIsModalOpen = (state, modalType) => {
  return state[modalsMap[modalType]];
};

export const getEditAudioNodeId = (state) => state.editAudioNodeId;

export const getPointerCoords = (state) => state.pointerCoords;

export const getNodeContextMenuId = (state) => state.nodeContextMenuNodeId;

export const getConnectionContextMenuIds = (state) => state.connectionContextMenuNodesId;
