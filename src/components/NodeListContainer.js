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

const adders = {
  [NODE_TYPES.SOURCE]: actions.toggleAddInputModal,
  [NODE_TYPES.DESTINATION]: actions.toggleAddOutputModal,
  [NODE_TYPES.AUDIONODE]: actions.toggleAddAudioNodeModal,
};

const mapState = (state, ownProps) => {
  return {
    nodes: getters[ownProps.type](state)
  };
};

const mapDispatch = (dispatch, ownProps) => {
  let props = {
    onDelete: (nodeId) => dispatch(actions.deleteNode(nodeId)),
    onAdd: () => dispatch(adders[ownProps.type]()),
    onEdit: (nodeId) => dispatch(actions.toggleEditGainModal(nodeId)),
  };
  return (ownProps.type === NODE_TYPES.AUDIONODE)
    ? props
    : R.omit(["onEdit"], props);
};

const NodeListContainer = connect(mapState, mapDispatch)(NodeList);

export default NodeListContainer;