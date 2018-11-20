import * as vag from 'virtual-audio-graph';
import { NODE_TYPES } from '../../store/constants';
import { bindPluginUtils } from '../../utils';
import plugins from '../../plugins';
const pluginUtils = bindPluginUtils(plugins);

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
  return pluginUtils.getPluginsVagCode(node.nodeTypeId)(node.output, node.props);
};

const makeNode = (node) => {
  switch (node.type) {
    case NODE_TYPES.SOURCE:
      return makeSourceFromDevice(node);
    case NODE_TYPES.DESTINATION:
      return makeDestinationFromDevice(node);
    case NODE_TYPES.AUDIONODE:
      return makeAudioNode(node);
    default:
      return Promise.resolve(null);
  }
};

export default makeNode;