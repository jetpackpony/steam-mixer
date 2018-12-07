import React, { Fragment } from 'react';
import { Button, Typography } from '@material-ui/core';
import ModalBox from '../ModalBox';
import { connect } from 'react-redux';
import { toggleHelpModal } from '../../store/actions';
import { getIsModalOpen } from '../../store/reducers';
import { MODAL_TYPES } from '../../store/constants';

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
      <Fragment>
        <Typography variant="body1" gutterBottom>
          This tool allows you to connect audio input devices to audio output
          devices on your computer.
          This makes it possible to mix sounds from input devices adjusting
          gains and adding effects for each device individually, just like you
          would on a hardware audio mixer, but in a more flexible way.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Usage
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use the menu in the top-left corner to add an input (ex. microphone)
          and an output (ex. speakers) device.
          You can the created devices to rearrange them.
          The shapes to the left and right of the nodes are input and output of
          the device:
          // images with those
          To connect input to output, click on an output of your microphone,
          then click on an input of your speakers:
          // images with clicks highlighted
          You should now hear your microphone through the speakers
          Use top-left menu to add audio nodes like gains and compressors to
          adjust sound coming from input devices.

          You can create pretty complex audio graphs like this one:
          // pubg setup
          In this setup for twitch streaming we have sounds from microphone, 
          game and discord connected to headphones and OBS (streaming software).
          A setup like this allows us to adjust the volume and effects that we
          hear in our headphones separately from what is recorded by OBS and
          visa versa.
          Use software like Virtual Audio Cable to crate virtual audio devices
          on your machine.

          If you experience delays in audio, try refreshing this page. This 
          tool saves your graph in your browser's localStorage, so your graph is
          safe unless you force to clear it.
        </Typography>
      </Fragment>
    }
    footer={
      <Button onClick={toggle}>Ok</Button>
    }
  />
);

export default connect(mapState, mapDispatch)(HelpWindow);