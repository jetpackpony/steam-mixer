import React from 'react';
import WebAudioEngine from './components/WebAudioEngine';
import AddEndpointContainer from './components/AddEndpointContainer';
import AddConnectionContainer from './components/AddConnectionContainer';
import { MODAL_TYPES } from './store/constants';
import AddAudioNodeContainer from './components/AddAudioNodeContainer';
import EditAudioNodeContainer from './components/EditAudioNodeContainer';
import Topbar from './components/Topbar';
import CanvasContainer from './components/CanvasContainer';
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
    <CanvasContainer/>
    <AddEndpointContainer type={MODAL_TYPES.ADD_INPUT} />
    <AddEndpointContainer type={MODAL_TYPES.ADD_OUTPUT} />
    <AddConnectionContainer />
    <AddAudioNodeContainer />
    <EditAudioNodeContainer />
  </MuiThemeProvider>
);

export default App;
