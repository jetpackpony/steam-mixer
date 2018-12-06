import React from 'react';
import WebAudioEngine from './components/WebAudioEngine';
import { MODAL_TYPES } from './store/constants';
import AddEndpointModal from './components/AddEndpointModal';
import AddAudioNodeModal from './components/AddAudioNodeModal';
import EditAudioNodeContainer from './components/EditAudioNodeContainer';
import Topbar from './components/Topbar';
import Canvas from './components/Canvas';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <WebAudioEngine />
    <Topbar/>
    <Canvas/>
    <AddEndpointModal type={MODAL_TYPES.ADD_INPUT} />
    <AddEndpointModal type={MODAL_TYPES.ADD_OUTPUT} />
    <AddAudioNodeModal/>
    <EditAudioNodeContainer />
  </MuiThemeProvider>
);

export default App;
