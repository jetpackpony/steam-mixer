import { connect } from 'react-redux';
import AddAudioNode from './AddAudioNode';
import { toggleAddAudioNodeModal, addAudioNode } from '../store/actions';
import { getIsModalOpen } from '../store/reducers';
import { MODAL_TYPES, AUDIO_NODE_TYPES } from '../store/constants';

const mapState = (state, ownProps) => {
  return {
    isOpen: getIsModalOpen(state, MODAL_TYPES.ADD_AUDIO_NODE),
    nodeTypesList: AUDIO_NODE_TYPES
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    onCreate: (title, nodeTypeId) => dispatch(addAudioNode(title, nodeTypeId)),
    toggle: () => dispatch(toggleAddAudioNodeModal())
  };
};

export default connect(mapState, mapDispatch)(AddAudioNode);
