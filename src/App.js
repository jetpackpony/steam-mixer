import React, { Component, Fragment } from 'react';
import './App.css';
import * as R from 'ramda';
import NodeList from './components/NodeList';
import AddEndpoint from './components/AddEndpoint';
import EditGain from './components/EditGain';
import AddConnection from './components/AddConnection';
import { CardDeck } from 'reactstrap';
import WebAudioEngine from './components/WebAudioEngine';
import { DEVICE_TYPES } from './components/WebAudioEngine/constants';
import makeStore from './store';

const store = makeStore();

const getNodeTitleById = (state, id) => (
  R.compose(
    R.prop("title"),
    R.find(R.propEq("nodeId", id))
  )(state.audioGraph)
);

const selectInputs = (state) => (
  R.filter((node) => (node.type === DEVICE_TYPES.SOURCE), state.audioGraph)
);

const selectOutputs = (state) => (
  R.filter((node) => (node.type === DEVICE_TYPES.DESTINATION), state.audioGraph)
);

const selectNodes = (state) => (
  R.filter((node) => (node.type === "node"), state.audioGraph)
);

const selectConnections = (state) => (
  R.reduce((agregator, node) => (
    R.concat(
      agregator,
      R.map((out) => ({
        nodeId: node.nodeId + "-" + out,
        title: getNodeTitleById(state, node.nodeId) + " -> " + getNodeTitleById(state, out)
      }), node.output)
    )
  ), [], state.audioGraph)
);


let state = {
  webAudioDevices: { inputs: [], outputs: [] },
  audioGraph: {},
  ui: {
    addInputOpen: false,
    addOutputOpen: false,
    addConnectionOpen: false,
    editGainOpen: false,
    editGainId: null
  }
};

const getMicId = (devices) => devices.filter(d => d.label === "Internal Microphone (Built-in)" && d.kind === "audioinput")[0].deviceId;
const getHeadphonesId = (devices) => devices.filter(d => d.label === "Headphones (Built-in)" && d.kind === "audiooutput")[0].deviceId;
const getHDMIId = (devices) => devices.filter(d => d.label === "DELL S2415H (HDMI)" && d.kind === "audiooutput")[0].deviceId;

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = state;
    this.onDevicesLoaded = this.onDevicesLoaded.bind(this);
    this.volumeUp = this.volumeUp.bind(this);
    this.volumeDown = this.volumeDown.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

  onDevicesLoaded(devices) {
    console.log("devices loaded: ", devices);
    const audioGraph = {
      "0": {
        type: DEVICE_TYPES.SOURCE,
        output: ["3"],
        deviceId: getMicId(devices)
      },
      "1": {
        type: DEVICE_TYPES.DESTINATION,
        deviceId: getHeadphonesId(devices)
      },
      "2": {
        type: DEVICE_TYPES.DESTINATION,
        deviceId: getHDMIId(devices)
      },
      "3": {
        type: "node",
        constructor: "gain",
        output: ["1"],
        props: {
          gain: 1
        }
      }
    };
    this.setState({
      webAudioDevices: prepareDevices(devices),
      audioGraph: audioGraph
    });
  }

  updateVolume(newVolume) {
    this.setState({
      audioGraph: R.mergeDeepRight(
        this.state.audioGraph,
        {
          "3": {
            props: {
              gain: newVolume
            }
          }
        }
      )
    });
  }

  volumeUp() {
    let prevGain = this.state.audioGraph["3"].props.gain;
    this.updateVolume(prevGain + 1);
  }

  volumeDown() {
    let prevGain = this.state.audioGraph["3"].props.gain;
    this.updateVolume(prevGain - 1);
  }

  render() {
    let nodes = [
      { title: "First", nodeId: "I1"},
      { title: "Second", nodeId: "O1"},
      { title: "Third", nodeId: "C2"},
      { title: "Fourth", nodeId: "O2"},
    ];
    let onDelete = (nodeId) => console.log("deleting node " + nodeId);
    let onEdit = (nodeId) => console.log("editing node " + nodeId);
    const onCreateEndpoint = (device) => console.log("creating device: ", device);
    const addGainNode = () => console.log('adding a gain node');
    const openAddEndpoint = (type) => console.log("opening add endpoint menu for ", type);
    const openAddConnection = () => console.log("opening add connection menu");
    const onGainChange = (nodeId, value) => {
      console.log("setting gain for " + nodeId + " to " + value);
      this.setState({
        editingGainId: nodeId,
        editingGainValue: value
      });
    }
    const onAddConnection = ({ from, to }) => console.log("creating connection from " + from.title + " to " + to.title);
    const toggleAddInput = () => this.setState({
      addInputOpen: !this.state.addInputOpen
    });
    const toggleAddOutput = () => this.setState({
      addOutputOpen: !this.state.addOutputOpen
    });
    const toggleAddConnection = () => this.setState({
      addConnectionOpen: !this.state.addConnectionOpen
    });
    const toggleEditGain = () => this.setState({
      editGainOpen: !this.state.editGainOpen
    });
    const editGainNode = (nodeId) => {
      toggleEditGain();
      this.setState({
        editingGainId: nodeId,
        editingGainValue: 0
      });
    };
    return (
      <Fragment>
        {/*
        <WebAudioEngine
          onDevicesLoaded={this.onDevicesLoaded}
          devices={this.state.webAudioDevices}
          audioGraph={this.state.audioGraph}
          volumeUp={this.volumeUp}
          volumeDown={this.volumeDown}
        />
        */}
        <CardDeck>
          <NodeList
            title="Inputs"
            nodes={selectInputs(store.getState())}
            onDelete={onDelete}
            onAdd={toggleAddInput}
          />
          <NodeList
            title="Audio Nodes"
            nodes={selectNodes(store.getState())}
            onDelete={onDelete}
            onEdit={editGainNode}
            onAdd={addGainNode}
          />
          <NodeList
            title="Outputs"
            nodes={selectOutputs(store.getState())}
            onDelete={onDelete}
            onAdd={toggleAddOutput}
          />
          <NodeList
            title="Connections"
            nodes={selectConnections(store.getState())}
            onDelete={onDelete}
            onAdd={toggleAddConnection}
          />
        </CardDeck>
        <AddEndpoint
          type="input"
          deviceList={store.getState().webAudioDevices['inputs']}
          onCreate={onCreateEndpoint}
          toggle={toggleAddInput}
          isOpen={this.state.addInputOpen}
        />
        <AddEndpoint
          type="output"
          deviceList={store.getState().webAudioDevices['outputs']}
          onCreate={onCreateEndpoint}
          toggle={toggleAddOutput}
          isOpen={this.state.addOutputOpen}
        />
        <AddConnection
          nodesList={nodes}
          onAddConnection={onAddConnection}
          toggle={toggleAddConnection}
          isOpen={this.state.addConnectionOpen}
        />
        <EditGain
          nodeId={this.state.editingGainId}
          value={this.state.editingGainValue}
          onGainChange={onGainChange}
          isOpen={this.state.editGainOpen}
          toggle={toggleEditGain}
        />
      </Fragment>
    );
  }
}

export default App;
