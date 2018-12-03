import * as R from 'ramda';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import { getAllNodes, makeActionListForNode } from '../store/reducers';
import { moveNode, createConnectionStart } from '../store/actions';

const mapState = (state) => {
  return {
    nodes: getAllNodes(state)
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
    onNodeMove: (nodeId, newCoords) => dispatch(moveNode(nodeId, newCoords)),
    onOutputPortClick: (nodeId) => dispatch(createConnectionStart(nodeId))
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    nodes: R.map((node) => ({
      ...node,
      contextActions: makeActionListForNode(node, dispatchProps.dispatch)
    }), stateProps.nodes)
  };
};

const NodeListContainer = connect(mapState, mapDispatch, mergeProps)(NodeList);

export default NodeListContainer;