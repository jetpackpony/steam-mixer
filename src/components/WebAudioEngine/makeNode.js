import * as R from 'ramda';
import * as vag from 'virtual-audio-graph';
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

  return vag.mediaStreamSource(node.output, { mediaStream: stream });
};

const makeDestinationFromDevice = async (node) => {
  return vag.mediaStreamDestination();
};

const makeAudioNode = async (node) => {
  return vag[node.constructor](node.output, node.props);
};

const makeNode = (node, id) => {
  switch (node.type) {
    case DEVICE_TYPES.SOURCE:
      return makeSourceFromDevice(node);
    case DEVICE_TYPES.DESTINATION:
      return makeDestinationFromDevice(node);
    case "node":
      return makeAudioNode(node);
    default:
      return Promise.resolve(null);
  }
};

export default makeNode;