import { connect } from 'react-redux';
import { getIsModalOpen, getEditGainId, getGainValueById } from '../store/reducers';
import EditGain from './EditGain';
import { MODAL_TYPES } from '../store/constants';
import { toggleEditGainModal, changeGain } from '../store/actions';

const mapState = (state) => {
  const nodeId = getEditGainId(state);
  return {
    isOpen: getIsModalOpen(state, MODAL_TYPES.EDIT_GAIN),
    value: getGainValueById(state, nodeId),
    nodeId
  };
};

const mapDispatch = {
  toggle: toggleEditGainModal,
  onGainChange: changeGain
};

export default connect(mapState, mapDispatch)(EditGain);
