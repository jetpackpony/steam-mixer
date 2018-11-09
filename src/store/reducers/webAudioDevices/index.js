import * as R from 'ramda';
import { ACTION_TYPES } from "../../actions";
import initState from './initialState';

const isAudioDevice = device => device.kind === "audioinput" || device.kind === "audiooutput";
const isDefaultDevice = device => device.deviceId !== "default";
const breakIntoCategories = R.reduce((res, el) => {
  if (el.kind === "audioinput") {
    res.inputs.push(el);
  }
  if (el.kind === "audiooutput") {
    res.outputs.push(el);
  }
  return res;
}, { inputs: [], outputs: [] });
const prepareDevices = R.compose(
  breakIntoCategories,
  R.filter(isDefaultDevice),
  R.filter(isAudioDevice),
);

const webAudioDevices = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DEVICE_LIST:
      return prepareDevices(action.devices);
    default:
      return state;
  }
};

export default webAudioDevices;
export * from './selectors';