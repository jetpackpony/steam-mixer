import { combineReducers } from 'redux';
import ui from './ui';
import webAudioDevices from './webAudioDevices';
import audioGraph from './audioGraph';

const reducer = combineReducers({
  webAudioDevices,
  audioGraph,
  ui
});

export default reducer;