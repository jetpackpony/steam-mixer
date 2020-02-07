import React, { Fragment } from 'react';
import Mic from '@material-ui/icons/Mic';
import { Button, Typography } from '@material-ui/core';
import ModalBox from '../ModalBox';
import { connect } from 'react-redux';
import { closePermissionsModal } from '../../store/actions';
import { getIsModalOpen } from '../../store/reducers';
import { MODAL_TYPES } from '../../store/constants';

const mapState = (state) => ({
  isOpen: getIsModalOpen(state, MODAL_TYPES.PERMISSIONS)
});

const mapDispatch = {
  close: closePermissionsModal
};

const PermissionsModal = ({ isOpen, close }) => (
  <ModalBox
    isOpen={isOpen}
    toggle={close}
    header="I am once again asking you for your audio permissions"
    body={
      <Fragment>
        <Typography variant="body1" gutterBottom>
          This app needs microphone permissions to function properly. Please click
          the button below, then allow microphone access in the top left corner of
          your browser.
        </Typography>
        <Typography variant="caption" color="error" gutterBottom>
          Note: we don't record audio from your microphone. All audio is processed
          on the client and never leaves your machine.
        </Typography>
        <Typography align="center">
          <Button color="secondary" size="large" variant="contained" onClick={() => {
            navigator.mediaDevices.getUserMedia({ audio: true })
              .then(() => {
                window.location.reload();
              });
          }}><Mic/></Button>
        </Typography>
      </Fragment>
    }
  />
);
    
export default connect(mapState, mapDispatch)(PermissionsModal);