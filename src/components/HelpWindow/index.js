import React, { Fragment } from 'react';
import { Button, Typography } from '@material-ui/core';
import ModalBox from '../ModalBox';
import { connect } from 'react-redux';
import { toggleHelpModal } from '../../store/actions';
import { getIsModalOpen } from '../../store/reducers';
import { MODAL_TYPES } from '../../store/constants';
import classes from './HelpWindow.module.scss';
import img1 from './help-img-1-1.png';
import img2 from './help-img-2-1.png';
import img3 from './help-img-3-1.png';

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
    header="Welcome to Audio Mixer"
    body={
      <Fragment>
        <Typography variant="body1" gutterBottom>
          This tool allows you to connect audio input devices to audio output
          devices on your computer.
        </Typography>
        <Typography variant="body1" gutterBottom>
          This makes it possible to mix sounds from input devices adjusting
          gains and adding effects for each device individually, just like you
          would on a hardware audio mixer.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Usage
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use the menu in the top-left corner to add an input device (for example microphone)
          and an output (for example headphones) device.
          You can drag the created devices to rearrange them.
          The shapes to the left and right of the nodes are input and output of
          the device:
        </Typography>
        <img className={classes.image} src={img1} alt="img1" />

        <Typography variant="body1" gutterBottom>
          To connect input to output, click on an output of your microphone,
          then click on an input of your headphones:
        </Typography>
        <img className={classes.image} src={img2} alt="img2" />

        <Typography variant="body1" gutterBottom>
          You should now hear your microphone through the headphones.
          Use top-left menu to add audio nodes like gains and compressors to
          modify sound coming from input devices.
        </Typography>
        <Typography variant="body1" gutterBottom>
            You can create pretty complex audio graphs like this one:
        </Typography>
        <img className={classes.image} src={img3} alt="img3" />

        <Typography variant="body1" gutterBottom>
          In this setup for twitch streaming we have sounds from microphone,
          game and discord connected to headphones and OBS (streaming software).
          A setup like this allows you to adjust the volume and effects for each
          sound source separately for both headphones and OBS.
        </Typography>

        <Typography variant="body1" gutterBottom>
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