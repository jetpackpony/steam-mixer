import * as R from 'ramda';
import React, { Component } from 'react';
import createVirtualAudioGraph from 'virtual-audio-graph';
import makeNode from './makeNode';
import { PromiseAllObj } from '../../utils';
import { DEVICE_TYPES } from './constants';

const isNodeADeviceDestination = (d) => d.type === DEVICE_TYPES.DESTINATION;

const makeVAGUpdateObject = (props) => {
  return PromiseAllObj(R.mapObjIndexed(makeNode, props));
};

const createSinkForDestination = async (stream, deviceId) => {
  let audio = new Audio();
  audio.autoplay = true;
  audio.srcObject = stream;
  await audio.setSinkId(deviceId);
  return audio;
};

const createAudioSinks = (props, virtualAudioGraph) => {
  let destProps = R.filter(isNodeADeviceDestination, props);
  console.log(destProps);
  return PromiseAllObj(
    R.mapObjIndexed((dest, destId) => {
      return createSinkForDestination(
        virtualAudioGraph.getAudioNodeById(destId).stream,
        dest.deviceId
      );
    }, destProps)
  );
};

const loadDevices = () => {
  return navigator.mediaDevices.enumerateDevices();
};

class WebAudioEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      virtualAudioGraph: createVirtualAudioGraph(),
      sinks: {}
    };
  }

  componentDidMount() {
    loadDevices()
      .then(this.props.onDevicesLoaded);
  }

  componentDidUpdate() {
    const vagProps = this.props.audioGraph;
    console.log("Running VAG with props: ", vagProps);

    (async () => {
      const updateObject = await makeVAGUpdateObject(this.props.audioGraph);
      this.state.virtualAudioGraph.update(updateObject);
      let sinks = await createAudioSinks(this.props.audioGraph, this.state.virtualAudioGraph);
      console.log(sinks);
    })();
  }

  render() {
    return <div>Testme</div>;
  }
};

export default WebAudioEngine;