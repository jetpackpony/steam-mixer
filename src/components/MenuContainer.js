import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import {
  toggleAddInputModal,
  toggleAddAudioNodeModal,
  toggleAddOutputModal,
  toggleHelpModal
} from '../store/actions';
import Mic from '@material-ui/icons/Mic';
import Headset from '@material-ui/icons/Headset';
import Equalizer from '@material-ui/icons/Equalizer';
import Help from '@material-ui/icons/Help';

const mapDispatch = (dispatch) => ({
  actions: [
    {
      title: "Add Input",
      icon: <Mic/>,
      onClick: () => dispatch(toggleAddInputModal())
    },
    {
      title: "Add Output",
      icon: <Headset/>,
      onClick: () => dispatch(toggleAddOutputModal())
    },
    {
      title: "Add Audio Node",
      icon: <Equalizer/>,
      onClick: () => dispatch(toggleAddAudioNodeModal())
    },
    {
      title: "Help",
      icon: <Help/>,
      onClick: () => dispatch(toggleHelpModal())
    }
  ]
});

export default connect(null, mapDispatch)(Menu);