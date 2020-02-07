import * as R from 'ramda';

const isDeviceAnInput = R.propEq('kind', "audioinput");
const isDeviceAnOutput = R.propEq('kind', "audiooutput");

const filterInputDevices = R.filter(isDeviceAnInput);
const filterOutputDevices = R.filter(isDeviceAnOutput);

export const isAudioDevice = R.either(isDeviceAnInput, isDeviceAnOutput);

const isDefaultDevice = R.propEq("deviceId", "default");
const isNotDefaultDevice = R.complement(isDefaultDevice);

const isDeviceHasEmptyLabel = (device) => device.label === "";
export const needToRequestAudioPermissions = (list) => {
  return R.all(isDeviceHasEmptyLabel)(list)
};

/**
 * Takes a list of audio devices `audioDeviceList`. Returns an object
 * with of the shape { inputs: [], outputs: [] } with input devices put into
 * `inputs` property and output devices - into `outputs` property
 *
 * @func
 * @sig [a] -> {k:v}
 * @param {Array} audioDeviceList The list of audio devices
 * @return {Object} An object of the shape { inputs: [], outputs: [] }
 */
const breakDevicesIntoCategories =
  R.converge(
    (inputs, outputs) => ({ inputs, outputs }),
    [filterInputDevices, filterOutputDevices]
  );

export const updateDeviceList = (state, action) => (
  R.compose(
    breakDevicesIntoCategories,
    R.filter(isNotDefaultDevice),
    R.filter(isAudioDevice),
  )(action.devices)
);