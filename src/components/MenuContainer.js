import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import {
  toggleAddInputModal, toggleAddAudioNodeModal, toggleAddOutputModal
} from '../store/actions';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const mapDispatch = (dispatch) => ({
  actions: [
    {
      title: "Add Input",
      icon: <InboxIcon />,
      onClick: () => dispatch(toggleAddInputModal())
    },
    {
      title: "Add Output",
      icon: <InboxIcon />,
      onClick: () => dispatch(toggleAddOutputModal())
    },
    {
      title: "Add Audio Node",
      icon: <InboxIcon />,
      onClick: () => dispatch(toggleAddAudioNodeModal())
    }
  ]
});

export default connect(null, mapDispatch)(Menu);