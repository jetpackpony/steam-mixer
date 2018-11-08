import { combineReducers } from 'redux';
import ui from './ui';
import webAudioDevices from './webAudioDevices';
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