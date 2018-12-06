import { connect } from 'react-redux';
import AddAudioNodeModal from './component';
import { toggleAddAudioNodeModal, addAudioNode } from '../../store/actions';
import { getIsModalOpen } from '../../store/reducers';
import { MODAL_TYPES } from '../../store/constants';
import { getAudioNodesTypes } from '../../utils';

const mapState = (state) => ({
  isOpen: getIsModalOpen(state, MODAL_TYPES.ADD_AUDIO_NODE),
  nodeTypesList: getAudioNodesTypes()
});

const mapDispatch = {
  onCreate: addAudioNode,
  toggle: toggleAddAudioNodeModal
};

export default connect(mapState, mapDispatch)(AddAudioNodeModal);
