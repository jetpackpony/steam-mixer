import { connect } from 'react-redux';
import ContextMenu from './ContextMenu';
import { toggleNodeContextMenu } from '../store/actions';
import { MODAL_TYPES } from '../store/constants';
import {
  getPointerCoords, getNodeById,
  getNodeContextMenuId, getIsModalOpen, makeActionListForNode
} from '../store/reducers';

const mapState = (state) => {
  const nodeId = getNodeContextMenuId(state);
  return {
    coords: getPointerCoords(state),
    isOpen: getIsModalOpen(state, MODAL_TYPES.NODE_CONTEXT_MENU),
    nodeId,
    node: getNodeById(state, nodeId)
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    toggle: () => dispatch(toggleNodeContextMenu()),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    actions: (stateProps.node)
      ? makeActionListForNode(stateProps.node, dispatchProps.dispatch)
      : []
  };
};

export default connect(mapState, mapDispatch, mergeProps)(ContextMenu);