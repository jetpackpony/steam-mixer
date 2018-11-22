import * as R from 'ramda';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import { NODE_TYPES } from '../store/constants';
import { getInputNodes, getOutputNodes, getAudioNodes } from '../store/reducers';
import * as actions from '../store/actions';

const getters = {
  [NODE_TYPES.SOURCE]: getInputNodes,
  [NODE_TYPES.DESTINATION]: getOutputNodes,
  [NODE_TYPES.AUDIONODE]: getAudioNodes,
};

const mapState = (state, ownProps) => {
  return {
    state,
    nodes: getters[ownProps.type](state)
  };
};

const mapDispatch = (dispatch, ownProps) => {
  let props = {
    onDelete: (nodeId) => dispatch(actions.deleteNode(nodeId)),
    onEdit: (nodeId) => dispatch(actions.toggleEditAudioNodeModal(nodeId)),
  };
  return (ownProps.type === NODE_TYPES.AUDIONODE)
    ? props
    : R.omit(["onEdit"], props);
};

const NodeListContainer = connect(mapState, mapDispatch)(NodeList);

export default NodeListContainer;