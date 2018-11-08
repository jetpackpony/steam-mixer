import { combineReducers } from 'redux';
import ui, * as uiSelectors from './ui';
import webAudioDevices, * as webAudioDevicesSelectors from './webAudioDevices';
import audioGraph, * as audioGraphSelectors from './audioGraph';

const reducer = combineReducers({
  webAudioDevices,
  audioGraph,
  ui
});

export default reducer;

export const getInputNodes = (state) => (
  audioGraphSelectors.getInputNodes(state.audioGraph)
);

export const getOutputNodes = (state) => (
  audioGraphSelectors.getOutputNodes(state.audioGraph)
);

export const getAudioNodes = (state) => (
  audioGraphSelectors.getAudioNodes(state.audioGraph)
);

export const getNodeTitleById = (state, id) => (
  audioGraphSelectors.getNodeTitleById(state.audioGraph, id)
);

export const getConnections = (state) => (
  audioGraphSelectors.getConnections(state.audioGraph)
);

export const getGainValueById = (state, id) => (
  audioGraphSelectors.getGainValueById(state.audioGraph, id)
);

export const getIsModalOpen = (state, modalType) => (
  uiSelectors.getIsModalOpen(state.ui, modalType)
);

export const getInputDevices = (state) => (
  webAudioDevicesSelectors.getInputDevices(state.webAudioDevices)
);

export const getOutputDevices = (state) => (
  webAudioDevicesSelectors.getOutputDevices(state.webAudioDevices)
);

export const getAllNodes = (state) => (
  audioGraphSelectors.getAllNodes(state.audioGraph)
);
