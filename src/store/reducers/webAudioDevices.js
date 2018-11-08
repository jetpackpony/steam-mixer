import * as R from 'ramda';
import { ACTION_TYPES } from "../actions";

/*
let initState = {
  webAudioDevices: { inputs: [], outputs: [] },
};
*/
let initState = {
  "inputs": [
    {
      "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
      "kind": "audioinput",
      "label": "Internal Microphone (Built-in)",
      "groupId": "3754b18890f757b22833783679147f0a4f5b4c3dba9e44912c44e78d11b19c7c"
    },
    {
      "deviceId": "4d1fde33c762ff9b0aa3f5c7862358f87fc231c654d990786c141760ec338832",
      "kind": "audioinput",
      "label": "Soundflower (2ch)",
      "groupId": "646fd1a93c96a3d126a1ae6b886c1a71571c69369c50f998c1614511d7cf0715"
    },
    {
      "deviceId": "0fbf7ce92bb0d22ee6af20c1ad1732837bd399c4aed8007cf8b52c69752c9da4",
      "kind": "audioinput",
      "label": "Soundflower (64ch)",
      "groupId": "d6c8a4da25c7886707064947015abc91b5487645067338d0b10b3e9abb6dea46"
    }
  ],
  "outputs": [
    {
      "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36",
      "kind": "audiooutput",
      "label": "Headphones (Built-in)",
      "groupId": "3754b18890f757b22833783679147f0a4f5b4c3dba9e44912c44e78d11b19c7c"
    },
    {
      "deviceId": "2409773f188cda81b5306105d1817722f9089681a3b2c1b979f843398d3a15eb",
      "kind": "audiooutput",
      "label": "DELL S2415H (HDMI)",
      "groupId": "39b18a6d8e8f50344c8a90b0ffe502659eb3db02c28371dbd2779218d0824e5c"
    },
    {
      "deviceId": "4d1fde33c762ff9b0aa3f5c7862358f87fc231c654d990786c141760ec338832",
      "kind": "audiooutput",
      "label": "Soundflower (2ch)",
      "groupId": "c8a60094541ffc221925615969bb492b3489590217d480493946ca2227dd8392"
    },
    {
      "deviceId": "0fbf7ce92bb0d22ee6af20c1ad1732837bd399c4aed8007cf8b52c69752c9da4",
      "kind": "audiooutput",
      "label": "Soundflower (64ch)",
      "groupId": "600eb94f703c976782aede8800e890b7e4215c3bc8422829f0e755d40c7f83bf"
    }
  ]
};

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