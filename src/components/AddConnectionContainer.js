import { connect } from 'react-redux';
import { getIsModalOpen, getAllNodes } from '../store/reducers';
import AddConnection from './AddConnection';
import { MODAL_TYPES } from '../store/constants';
import { addConnection, toggleAddConnectionModal } from '../store/actions';

const mapState = (state) => {
  return {
    isOpen: getIsModalOpen(state, MODAL_TYPES.ADD_CONNECTION),
    nodesList: getAllNodes(state)
  };
};

const mapDispatch = {
  onAddConnection: addConnection,
  toggle: toggleAddConnectionModal
};

export default connect(mapState, mapDispatch)(AddConnection);
