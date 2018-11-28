import React, { Fragment } from 'react';
import './App.css';
import WebAudioEngine from './components/WebAudioEngine';
import AddEndpointContainer from './components/AddEndpointContainer';
import AddConnectionContainer from './components/AddConnectionContainer';
import { MODAL_TYPES } from './store/constants';
import AddAudioNodeContainer from './components/AddAudioNodeContainer';
import EditAudioNodeContainer from './components/EditAudioNodeContainer';
import Topbar from './components/Topbar';
import Canvas from './components/Canvas';

const App = () => (
  <Fragment>
    <WebAudioEngine />
    <Topbar/>
    <Canvas/>
    <AddEndpointContainer type={MODAL_TYPES.ADD_INPUT} />
    <AddEndpointContainer type={MODAL_TYPES.ADD_OUTPUT} />
    <AddConnectionContainer />
    <AddAudioNodeContainer />
    <EditAudioNodeContainer />
  </Fragment>
);

export default App;
