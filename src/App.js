import React, { Fragment } from 'react';
import './App.css';
import { CardDeck } from 'reactstrap';
import WebAudioEngine from './components/WebAudioEngine';
import NodeListContainer from './components/NodeListContainer';
import ConnectionListContainer from './components/ConnectionListContainer';
import AddEndpointContainer from './components/AddEndpointContainer';
import AddConnectionContainer from './components/AddConnectionContainer';
import { NODE_TYPES, MODAL_TYPES } from './store/constants';
import AddAudioNodeContainer from './components/AddAudioNodeContainer';
import EditAudioNodeContainer from './components/EditAudioNodeContainer';

const App = () => (
  <Fragment>
    <WebAudioEngine />
    <CardDeck>
      <NodeListContainer title="Inputs" type={NODE_TYPES.SOURCE} />
      <NodeListContainer title="Audio Nodes" type={NODE_TYPES.AUDIONODE} />
      <NodeListContainer title="Outputs" type={NODE_TYPES.DESTINATION} />
      <ConnectionListContainer title="Connections" />
    </CardDeck>
    <AddEndpointContainer type={MODAL_TYPES.ADD_INPUT} />
    <AddEndpointContainer type={MODAL_TYPES.ADD_OUTPUT} />
    <AddConnectionContainer />
    <AddAudioNodeContainer />
    <EditAudioNodeContainer />
  </Fragment>
);

export default App;
