import * as R from 'ramda';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import { getAllNodes, makeActionListForNode } from '../store/reducers';

const mapState = (state) => {
  return {
    nodes: getAllNodes(state)
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
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