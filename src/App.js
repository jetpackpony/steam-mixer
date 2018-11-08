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
import ConnectionList from './components/ConnectionList';

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
        fromTitle: getNodeTitleById(state, node.nodeId),
        fromId: node.nodeId,
        toTitle: getNodeTitleById(state, out),
        toId: out
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

const toggleAddInput = () => store.dispatch(actions.toggleAddInputModal());
const toggleAddOutput = () => store.dispatch(actions.toggleAddOutputModal());
const toggleAddConnection = () => store.dispatch(actions.toggleAddConnectionModal());
const toggleEditGain = (nodeId) => store.dispatch(actions.toggleEditGainModal(nodeId));
const addEndpoint = R.curry(
  (deviceType, title, device) =>
    store.dispatch(actions.addEndpoint(deviceType, title, device))
);
const addGainNode = () => store.dispatch(actions.addGainNode());
const addConnection = (fromId, toId) => store.dispatch(actions.addConnection(fromId, toId));
const deleteNode = (nodeId) => store.dispatch(actions.deleteNode(nodeId));
const deleteConnection = (fromId, toId) => store.dispatch(actions.deleteConnection(fromId, toId));
const changeGain = (nodeId, value) => store.dispatch(actions.changeGain(nodeId, value));
const updateDeviceList = (devices) => store.dispatch(actions.updateDeviceList(devices));

class App extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    console.log("rendering with store: ", store.getState());
    return (
      <Fragment>
        <WebAudioEngine
          onDevicesLoaded={updateDeviceList}
          devices={store.getState().webAudioDevices}
          audioGraph={store.getState().audioGraph}
        />
        <CardDeck>
          <NodeList
            title="Inputs"
            nodes={selectInputs(store.getState())}
            onDelete={deleteNode}
            onAdd={toggleAddInput}
          />
          <NodeList
            title="Audio Nodes"
            nodes={selectNodes(store.getState())}
            onDelete={deleteNode}
            onEdit={toggleEditGain}
            onAdd={addGainNode}
          />
          <NodeList
            title="Outputs"
            nodes={selectOutputs(store.getState())}
            onDelete={deleteNode}
            onAdd={toggleAddOutput}
          />
          <ConnectionList
            title="Connections"
            nodes={selectConnections(store.getState())}
            onDelete={deleteConnection}
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
          onAddConnection={addConnection}
          toggle={toggleAddConnection}
          isOpen={store.getState().ui.addConnectionOpen}
        />
        <EditGain
          nodeId={store.getState().ui.editGainId}
          value={getGainValueById(store.getState(), store.getState().ui.editGainId)}
          onGainChange={changeGain}
          isOpen={store.getState().ui.editGainOpen}
          toggle={toggleEditGain.bind(null, store.getState().ui.editGainId)}
        />
      </Fragment>
    );
  }
}

export default App;
