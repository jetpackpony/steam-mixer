import * as R from 'ramda';
import React, { Component } from 'react';
import createVirtualAudioGraph from 'virtual-audio-graph';
import makeNode from './makeNode';
import { PromiseAllObj } from '../../utils';
import { DEVICE_TYPES } from './constants';
import { AddButton, DeleteButton } from '../buttons';

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

const createAudioSinks = (props, virtualAudioGraph, sinks) => {
  let destProps = R.filter(isNodeADeviceDestination, props);
  return PromiseAllObj(
    R.mapObjIndexed((dest, destId) => {
      if (R.has(destId, sinks)) {
        return Promise.resolve(sinks[destId]);
      }
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

const getNotNil = R.filter(R.compose(R.not, R.isNil));

class WebAudioEngine extends Component {
  constructor(props) {
    super(props);
    this.virtualAudioGraph = createVirtualAudioGraph();
    this.sinks = {};
  }

  componentDidMount() {
    loadDevices()
      .then(this.props.onDevicesLoaded);
  }

  componentDidUpdate() {
    const vagProps = this.props.audioGraph;
    console.log("Running VAG with props: ", vagProps);

    (async () => {
      const updateObject = getNotNil(await makeVAGUpdateObject(this.props.audioGraph));
      this.virtualAudioGraph.update(updateObject);
      this.sinks = await createAudioSinks(this.props.audioGraph, this.virtualAudioGraph, this.sinks);
      console.log(this.virtualAudioGraph);
    })();
  }

  render() {
    return (
      <div>
        Testme
        <AddButton onClick={this.props.volumeUp} />
        <DeleteButton onClick={this.props.volumeDown} />
      </div>
    );
  }
};

export default WebAudioEngine;