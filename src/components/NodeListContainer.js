import { connect } from 'react-redux';
import NodeList from './NodeList';
import { getAllNodes } from '../store/reducers';
import * as actions from '../store/actions';

const mapState = (state) => {
  return {
    nodes: getAllNodes(state)
  };
};

const mapDispatch = (dispatch) => {
  return {
    onDelete: (nodeId) => dispatch(actions.deleteNode(nodeId)),
    onEdit: (nodeId) => dispatch(actions.toggleEditAudioNodeModal(nodeId)),
    onNodeClick: (nodeId, pointerCoords) => dispatch(actions.toggleNodeContextMenu(nodeId, pointerCoords))
  };
};

const NodeListContainer = connect(mapState, mapDispatch)(NodeList);

export default NodeListContainer;