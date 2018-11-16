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

export const getNodeById = (state, id) => (
  audioGraphSelectors.getNodeById(state.audioGraph, id)
);

export const getConnections = (state) => (
  audioGraphSelectors.getConnections(state.audioGraph)
);

export const getGainValueById = (state, id) => (
  audioGraphSelectors.getGainValueById(state.audioGraph, id)
);

export const getCompressorPropsById = (state, id) => (
  audioGraphSelectors.getCompressorPropsById(state.audioGraph, id)
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

export const getAllDevices = (state) => (
  webAudioDevicesSelectors.getAllDevices(state.webAudioDevices)
);

export const getAllNodes = (state) => (
  audioGraphSelectors.getAllNodes(state.audioGraph)
);

export const getEditGainId = (state) => (
  uiSelectors.getEditGainId(state.ui)
);

export const getEditCompressorId = (state) => (
  uiSelectors.getEditCompressorId(state.ui)
);