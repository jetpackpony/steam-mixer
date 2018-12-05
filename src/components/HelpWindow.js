import React from 'react';
import { Button } from '@material-ui/core';
import ModalBox from './ModalBox';
import { connect } from 'react-redux';
import { toggleHelpModal } from '../store/actions';
import { getIsModalOpen } from '../store/reducers';
import { MODAL_TYPES } from '../store/constants';

const mapState = (state) => ({
  isOpen: getIsModalOpen(state, MODAL_TYPES.HELP)
});

const mapDispatch = {
  toggle: toggleHelpModal
};

const HelpWindow = ({ isOpen, toggle }) => (
  <ModalBox
    isOpen={isOpen}
    toggle={toggle}
    header="Welcome to Stream Mixer"
    body={
      <h1>Help here</h1>
    }
    footer={
      <Button onClick={toggle}>Ok</Button>
    }
  />
);

export default connect(mapState, mapDispatch)(HelpWindow);