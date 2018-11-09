import * as R from 'ramda';

export const getInputDevices = (state) => state.inputs;
export const getOutputDevices = (state) => state.outputs;
export const getAllDevices = (state) => R.concat(state.inputs, state.outputs);