import * as R from 'ramda';
import { Component } from 'react';
import createVirtualAudioGraph from 'virtual-audio-graph';
import makeNode from './makeNode';
import { PromiseAllObj } from '../../utils';
import { NODE_TYPES } from '../../store/constants';
import { needToRequestAudioPermissions } from '../../store/reducers/webAudioDevices/handlers';

const isNodeADeviceDestination = (d) => d.type === NODE_TYPES.DESTINATION;

const makeVAGUpdateObject = (props) => {
  return PromiseAllObj(
    R.zipObj(
      R.pluck("nodeId", props),
      R.map(makeNode, props)
    )
  );
};

const createSinkForDestination = async (stream, deviceId) => {
  let audio = new Audio();
  audio.autoplay = true;
  audio.srcObject = stream;
  await audio.setSinkId(deviceId);
  return audio;
};

const createAudioSinks = (props, virtualAudioGraph, sinks) => {
  let destProps = R.filter(isNodeADeviceDestination, props);
  return PromiseAllObj(
    R.zipObj(
      R.pluck("nodeId", destProps),
      R.map((dest) => {
        let destId = dest.nodeId;
        if (R.has(destId, sinks)) {
          return Promise.resolve(sinks[destId]);
        }
        return createSinkForDestination(
          virtualAudioGraph.getAudioNodeById(destId).stream,
          dest.deviceId
        );
      }, destProps)
    )
  );
};

const loadDevices = (callback) => {
  return navigator.mediaDevices.enumerateDevices().then(callback);
};

const getNotNil = R.filter(R.compose(R.not, R.isNil));

class WebAudioEngine extends Component {
  constructor(props) {
    super(props);
    const AC = window.AudioContext || window.webkitAudioContext || false;
    if (!AC) {
      console.log("AudioContext is not supported");
    }
    this.virtualAudioGraph = createVirtualAudioGraph({ audioContext: new AC() });
    this.sinks = {};
    this.buildAudioGraph = this.buildAudioGraph.bind(this);
  }

  componentDidMount() {
    loadDevices((list) => {
      if (needToRequestAudioPermissions(list)) {
        this.props.onNeedsAudioPermissions();
      } else {
        this.props.onDevicesLoaded(list);
      }
    });
    navigator.mediaDevices.addEventListener('devicechange', (event) => {
      loadDevices(this.props.onDevicesLoaded);
    });
  }

  buildAudioGraph() {
    const vagProps = this.props.audioGraph;
    console.log("VAG props here: ", vagProps);

    (async () => {
      const updateObject = getNotNil(await makeVAGUpdateObject(this.props.audioGraph));
      this.virtualAudioGraph.update(updateObject);
      this.sinks = await createAudioSinks(this.props.audioGraph, this.virtualAudioGraph, this.sinks);
      console.log("New VAG here: ", this.virtualAudioGraph);
      console.log("Sinks here: ", this.sinks);
    })();
  }

  componentDidUpdate() {
    this.buildAudioGraph();
  }

  render() {
    return null;
  }
};

export default WebAudioEngine;