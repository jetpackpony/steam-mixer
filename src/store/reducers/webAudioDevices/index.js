import { ACTION_TYPES } from "../../actions";
import initState from './initialState';
import { updateDeviceList } from './handlers';

const webAudioDevices = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_DEVICE_LIST:
      return updateDeviceList(state, action);
    default:
      return state;
  }
};

export default webAudioDevices;
export * from './selectors';