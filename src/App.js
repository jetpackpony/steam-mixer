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
import * as actions from './store/actions';

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

const getGainValueById = (state, id) => (
  id !== null
    ? R.compose(
        R.path(["props", "gain"]),
        R.find(R.propEq("nodeId", id))
      )(state.audioGraph)
    : null
);

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
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    console.log("rendering with store: ", store.getState());
    let onDelete = (nodeId) => console.log("deleting node " + nodeId);
    let onEdit = (nodeId) => console.log("editing node " + nodeId);
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


    const toggleAddInput = () => store.dispatch(actions.toggleAddInputModal());
    const toggleAddOutput = () => store.dispatch(actions.toggleAddOutputModal());
    const toggleAddConnection = () => store.dispatch(actions.toggleAddConnectionModal());
    const toggleEditGain = (nodeId) => store.dispatch(actions.toggleEditGainModal(nodeId));

    const addEndpoint = R.curry(
      (deviceType, title, device) =>
        store.dispatch(actions.addEndpoint(deviceType, title, device))
    );

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
            onEdit={toggleEditGain}
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
          onCreate={addEndpoint.bind(null, DEVICE_TYPES.SOURCE)}
          toggle={toggleAddInput}
          isOpen={store.getState().ui.addInputOpen}
        />
        <AddEndpoint
          type="output"
          deviceList={store.getState().webAudioDevices['outputs']}
          onCreate={addEndpoint.bind(null, DEVICE_TYPES.DESTINATION)}
          toggle={toggleAddOutput}
          isOpen={store.getState().ui.addOutputOpen}
        />
        <AddConnection
          nodesList={store.getState().audioGraph}
          onAddConnection={onAddConnection}
          toggle={toggleAddConnection}
          isOpen={store.getState().ui.addConnectionOpen}
        />
        <EditGain
          nodeId={store.getState().ui.editGainId}
          value={getGainValueById(store.getState(), store.getState().ui.editGainId)}
          onGainChange={onGainChange}
          isOpen={store.getState().ui.editGainOpen}
          toggle={toggleEditGain.bind(null, store.getState().ui.editGainId)}
        />
      </Fragment>
    );
  }
}

export default App;
