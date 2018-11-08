import { connect } from 'react-redux';
import AddEndpoint from './AddEndpoint';
import { getIsModalOpen, getInputDevices, getOutputDevices } from '../store/reducers';
import { MODAL_TYPES, NODE_TYPES } from '../store/constants';
import { addEndpoint, toggleAddInputModal, toggleAddOutputModal } from '../store/actions';

const deviceGetters = {
  [MODAL_TYPES.ADD_INPUT]: getInputDevices,
  [MODAL_TYPES.ADD_OUTPUT]: getOutputDevices,
};
const mapState = (state, ownProps) => {
  return {
    isOpen: getIsModalOpen(state, ownProps.type),
    deviceList: deviceGetters[ownProps.type](state)
  };
};

const nodeTypes = {
  [MODAL_TYPES.ADD_INPUT]: NODE_TYPES.SOURCE,
  [MODAL_TYPES.ADD_OUTPUT]: NODE_TYPES.DESTINATION
};
const toggleActions = {
  [MODAL_TYPES.ADD_INPUT]: toggleAddInputModal,
  [MODAL_TYPES.ADD_OUTPUT]: toggleAddOutputModal
};
const mapDispatch = (dispatch, ownProps) => {
  const nodeType = nodeTypes[ownProps.type];
  return {
    onCreate: (title, device) => dispatch(addEndpoint(nodeType, title, device)),
    toggle: () => dispatch(toggleActions[ownProps.type]())
  };
};

export default connect(mapState, mapDispatch)(AddEndpoint);
