import { connect } from 'react-redux';
import AddAudioNode from './AddAudioNode';
import { toggleAddAudioNodeModal, addAudioNode } from '../store/actions';
import { getIsModalOpen } from '../store/reducers';
import { MODAL_TYPES } from '../store/constants';
import { getAudioNodesTypes } from '../utils';

const mapState = (state) => {
  return {
    isOpen: getIsModalOpen(state, MODAL_TYPES.ADD_AUDIO_NODE),
    nodeTypesList: getAudioNodesTypes()
  };
};

const mapDispatch = (dispatch) => {
  return {
    onCreate: (title, nodeTypeId) => dispatch(addAudioNode(title, nodeTypeId)),
    toggle: () => dispatch(toggleAddAudioNodeModal())
  };
};

export default connect(mapState, mapDispatch)(AddAudioNode);
