import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import {
  toggleAddInputModal,
  toggleAddAudioNodeModal,
  toggleAddOutputModal
} from '../store/actions';
import Mic from '@material-ui/icons/Mic';
import Headset from '@material-ui/icons/Headset';
import Equalizer from '@material-ui/icons/Equalizer';

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
    }
  ]
});

export default connect(null, mapDispatch)(Menu);