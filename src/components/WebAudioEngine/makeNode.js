import * as R from 'ramda';
import {
  mediaStreamSource,
  mediaStreamDestination
} from 'virtual-audio-graph';
import { DEVICE_TYPES } from './constants';

const makeSourceFromDevice = async (node) => {
  let stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: { exact: false },
      autoGainControl: { exact: false },
      noiseSuppression: { exact: false },
      deviceId: { exact: node.deviceId }
    },
    video: false
  });

  return mediaStreamSource(node.output, { mediaStream: stream });
};

const makeDestinationFromDevice = async (node) => {
  return mediaStreamDestination();
};

const makeNode = (node, id) => {
  switch (node.type) {
    case DEVICE_TYPES.SOURCE:
      return makeSourceFromDevice(node);
    case DEVICE_TYPES.DESTINATION:
      return makeDestinationFromDevice(node);
    default:
      return Promise.resolve(null);
  }
};

export default makeNode;