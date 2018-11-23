import { connect } from 'react-redux';
import ContextMenu from './ContextMenu';
import { toggleConnectionContextMenu, deleteConnection } from '../store/actions';
import { MODAL_TYPES } from '../store/constants';
import {
  getPointerCoords, getIsModalOpen,
  getConnectionContextMenuIds
} from '../store/reducers';

const mapState = (state) => {
  const nodeIds = getConnectionContextMenuIds(state);
  return {
    coords: getPointerCoords(state),
    isOpen: getIsModalOpen(state, MODAL_TYPES.CONNECTION_CONTEXT_MENU),
    fromId: nodeIds.fromId,
    toId: nodeIds.toId
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    toggle: () => dispatch(toggleConnectionContextMenu()),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    actions: [{
      title: "Delete Connection",
      onClick: () => dispatchProps.dispatch(deleteConnection(stateProps.fromId, stateProps.toId))
    }]
  };
};

export default connect(mapState, mapDispatch, mergeProps)(ContextMenu);