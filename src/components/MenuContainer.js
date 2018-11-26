import { connect } from 'react-redux';
import Menu from './Menu';
import {
  toggleAddInputModal, toggleAddAudioNodeModal,
  toggleAddOutputModal, toggleAddConnectionModal
} from '../store/actions';

const mapDispatch = {
    addInput: toggleAddInputModal,
    addAudioNode: toggleAddAudioNodeModal,
    addOutput: toggleAddOutputModal,
    addConnection: toggleAddConnectionModal
};

export default connect(null, mapDispatch)(Menu);