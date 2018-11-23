import React, { Fragment } from 'react';
import './App.css';
import WebAudioEngine from './components/WebAudioEngine';
import NodeListContainer from './components/NodeListContainer';
import ConnectionListContainer from './components/ConnectionListContainer';
import AddEndpointContainer from './components/AddEndpointContainer';
import AddConnectionContainer from './components/AddConnectionContainer';
import { MODAL_TYPES } from './store/constants';
import AddAudioNodeContainer from './components/AddAudioNodeContainer';
import EditAudioNodeContainer from './components/EditAudioNodeContainer';
import { Stage, Layer } from 'react-konva';
import MenuContainer from './components/MenuContainer';
import NodeContextMenuContainer from './components/NodeContextMenuContainer';
import ConnectionContextMenuContainer from './components/ConnectionContextMenuContainer';

const App = () => (
  <Fragment>
    <WebAudioEngine />
    <MenuContainer/>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <NodeListContainer/>
        <ConnectionListContainer title="Connections" />
      </Layer>
    </Stage>
    <AddEndpointContainer type={MODAL_TYPES.ADD_INPUT} />
    <AddEndpointContainer type={MODAL_TYPES.ADD_OUTPUT} />
    <AddConnectionContainer />
    <AddAudioNodeContainer />
    <EditAudioNodeContainer />
    <NodeContextMenuContainer/>
    <ConnectionContextMenuContainer/>
  </Fragment>
);

export default App;
