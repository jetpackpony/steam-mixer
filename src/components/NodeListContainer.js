import * as R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import NodeList from './NodeList';
import { NODE_TYPES } from '../store/constants';
import { getInputNodes, getOutputNodes, getAudioNodes, getNodeById } from '../store/reducers';
import * as actions from '../store/actions';
import { getNodeIndexByID } from '../store/reducers/audioGraph/utils';
import { debug } from 'util';

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
    state,
    nodes: getters[ownProps.type](state)
  };
};

const mapDispatch = (dispatch, ownProps) => {
  let props = {
    onDelete: (nodeId) => dispatch(actions.deleteNode(nodeId)),
    onAdd: () => dispatch(adders[ownProps.type]()),
    onEdit: R.curry((state, nodeId) => {
      const node = getNodeById(state, nodeId);
      switch(node.audioConstructor) {
        case "gain":
          return dispatch(actions.toggleEditGainModal(nodeId));
        case "dynamicsCompressor":
          return dispatch(actions.toggleEditCompressorModal(nodeId));
        default:
          console.log("onEdit failed: ", node);
          return;
      }
    })
  };
  return (ownProps.type === NODE_TYPES.AUDIONODE)
    ? props
    : R.omit(["onEdit"], props);
};

const interMedNodeList = (props) => {
  const onEdit =
    (typeof props.onEdit === "function")
      ? props.onEdit(props.state)
      : null;
  return (
    <NodeList {...R.omit(["onEdit"], props)} onEdit={onEdit} />
  );
};
const NodeListContainer = connect(mapState, mapDispatch)(interMedNodeList);

export default NodeListContainer;