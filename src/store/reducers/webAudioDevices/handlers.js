import * as R from 'ramda';

const isAudioDevice = device => device.kind === "audioinput" || device.kind === "audiooutput";
const isDefaultDevice = device => device.deviceId !== "default";

const identitySecondArg = R.unapply(R.nth(1));
/*
 * String -> (a, {k:v}) -> [a]
 */
const makeAppendFn = (key) =>
  R.useWith(R.append, [R.identity, R.prop(key)]);
/*
 * String -> (a, {k:v}) -> {k:v}
 */
const makeAddDeviceFn = (key) =>
  R.converge(R.assoc(key), [makeAppendFn(key), identitySecondArg]);

/*
 * a -> {k: v} -> {k: v}
 * Takes a value and an accumulator. Returns an accumulator with the value appended
 * to "inputs" array
 */
const addInput = makeAddDeviceFn("inputs");
const addOutput = makeAddDeviceFn("outputs");

/*
 * a -> {k: v} -> {k: v}
 * Takes a device object and an accumulator. Returns an accumulator with the device
 * appended to the correct property of the accumulator, or the unchanged accumulator
 */
const categoriesReducer = R.flip(R.cond([
  [R.propEq('kind', "audioinput"), addInput],
  [R.propEq('kind', "audiooutput"), addOutput],
  [R.T, identitySecondArg],
]));

const breakIntoCategories = R.reduce(categoriesReducer, { inputs: [], outputs: [] });
const prepareDevices = R.compose(
  breakIntoCategories,
  R.filter(isDefaultDevice),
  R.filter(isAudioDevice),
);

export const updateDeviceList = (state, action) => {
  return prepareDevices(action.devices);
};