import React, { Component, Fragment } from 'react';
import './App.css';
import * as R from 'ramda';
import NodeList from './components/NodeList';
import AddEndpoint from './components/AddEndpoint';
import EditGain from './components/EditGain';
import AddConnection from './components/AddConnection';
import { CardDeck } from 'reactstrap';
import WebAudioEngine from './components/WebAudioEngine';
import { NODE_TYPES, MODAL_TYPES } from './store/constants';
import * as actions from './store/actions';
import ConnectionList from './components/ConnectionList';
import {
  getInputNodes, getOutputNodes,
  getAudioNodes, getConnections,
  getGainValueById
} from './store/reducers';
import { connect } from 'react-redux';
import NodeListContainer from './components/NodeListContainer';
import ConnectionListContainer from './components/ConnectionListContainer';
import AddEndpointContainer from './components/AddEndpointContainer';

class App extends Component {
  render() {
    const { state, dispatch } = this.props;
    console.log("rendering with store: ", state);

    const toggleAddInput = () => dispatch(actions.toggleAddInputModal());
    const toggleAddOutput = () => dispatch(actions.toggleAddOutputModal());
    const toggleAddConnection = () => dispatch(actions.toggleAddConnectionModal());
    const toggleEditGain = (nodeId) => dispatch(actions.toggleEditGainModal(nodeId));
    const addEndpoint = R.curry(
      (deviceType, title, device) =>
        dispatch(actions.addEndpoint(deviceType, title, device))
    );
    const addConnection = (fromId, toId) => dispatch(actions.addConnection(fromId, toId));
    const deleteConnection = (fromId, toId) => dispatch(actions.deleteConnection(fromId, toId));
    const changeGain = (nodeId, value) => dispatch(actions.changeGain(nodeId, value));
    const updateDeviceList = (devices) => dispatch(actions.updateDeviceList(devices));

    return (
      <Fragment>
        <WebAudioEngine
          onDevicesLoaded={updateDeviceList}
          audioGraph={state.audioGraph}
        />
        <CardDeck>
          <NodeListContainer
            title="Inputs"
            type={NODE_TYPES.SOURCE}
          />
          <NodeListContainer
            title="Audio Nodes"
            type={NODE_TYPES.AUDIONODE}
          />
          <NodeListContainer
            title="Outputs"
            type={NODE_TYPES.DESTINATION}
          />
          <ConnectionListContainer
            title="Connections"
          />
        </CardDeck>
        <AddEndpointContainer
          type={MODAL_TYPES.ADD_INPUT}
        />
        <AddEndpointContainer
          type={MODAL_TYPES.ADD_OUTPUT}
        />
        <AddConnection
          nodesList={state.audioGraph}
          onAddConnection={addConnection}
          toggle={toggleAddConnection}
          isOpen={state.ui.addConnectionOpen}
        />
        <EditGain
          nodeId={state.ui.editGainId}
          value={getGainValueById(state, state.ui.editGainId)}
          onGainChange={changeGain}
          isOpen={state.ui.editGainOpen}
          toggle={toggleEditGain.bind(null, state.ui.editGainId)}
        />
      </Fragment>
    );
  }
}

const mapState = (state) => ({
  state
});

export default connect(mapState)(App);
