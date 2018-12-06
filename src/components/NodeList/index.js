import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import {
  getAllNodes,
  makeActionListForNode,
  getIsConnectionCreatorActive
} from '../../store/reducers';
import {
  moveNode,
  createConnectionStart,
  createConnectionEnd,
  addConnection
} from '../../store/actions';
import { getDrawingConnectionNodeId } from '../../store/reducers';

const mapState = (state) => {
  return {
    nodes: getAllNodes(state),
    isDrawingConnection: getIsConnectionCreatorActive(state),
    drawingConnectionFromNodeId: getDrawingConnectionNodeId(state),
  };
};

const onInputPortClick = R.curry(
  (dispatch, isDrawingConnection, fromId, toId) => {
    if (isDrawingConnection) {
      dispatch(addConnection(fromId, toId));
      dispatch(createConnectionEnd(toId));
    }
  }
);

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...bindActionCreators({
      onNodeMove: moveNode,
      onOutputPortClick: createConnectionStart
    }, dispatchProps.dispatch),
    nodes: R.map((node) => ({
      ...node,
      contextActions: makeActionListForNode(node, dispatchProps.dispatch)
    }), stateProps.nodes),
    onInputPortClick:
      onInputPortClick(
        dispatchProps.dispatch,
        stateProps.isDrawingConnection,
        stateProps.drawingConnectionFromNodeId
      ),
  };
};

const NodeListContainer = connect(mapState, null, mergeProps)(NodeList);

export default NodeListContainer;