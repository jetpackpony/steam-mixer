import * as R from 'ramda';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import { getAllNodes, makeActionListForNode, getIsConnectionCreatorActive } from '../store/reducers';
import { moveNode, createConnectionStart, createConnectionEnd, addConnection } from '../store/actions';
import { getDrawingConnectionNodeId } from '../store/reducers';

const mapState = (state) => {
  return {
    nodes: getAllNodes(state),
    isDrawingConnection: getIsConnectionCreatorActive(state),
    drawingConnectionFromNodeId: getDrawingConnectionNodeId(state),
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    onNodeMove: (nodeId, newCoords) => dispatch(moveNode(nodeId, newCoords)),
    onOutputPortClick: (nodeId) => dispatch(createConnectionStart(nodeId)),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const onInputPortClick = (nodeId) => {
    dispatchProps.dispatch(addConnection(stateProps.drawingConnectionFromNodeId, nodeId));
    dispatchProps.dispatch(createConnectionEnd(nodeId));
  };
  return {
    ...stateProps,
    ...dispatchProps,
    nodes: R.map((node) => ({
      ...node,
      contextActions: makeActionListForNode(node, dispatchProps.dispatch)
    }), stateProps.nodes),
    onInputPortClick: (
      (stateProps.isDrawingConnection)
        ? onInputPortClick
        : () => null
    ),
  };
};

const NodeListContainer = connect(mapState, mapDispatch, mergeProps)(NodeList);

export default NodeListContainer;