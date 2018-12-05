import * as R from 'ramda';
import { NODE_TYPES } from '../../constants';
import { deleteNode, toggleEditAudioNodeModal } from '../../actions';
import { getPortCoords } from '../../../components/Node';

export const getInputNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.SOURCE), state)
);

export const getOutputNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.DESTINATION), state)
);

export const getAudioNodes = (state) => (
  R.filter((node) => (node.type === NODE_TYPES.AUDIONODE), state)
);

export const getNodeTitleById = (state, id) => (
  R.compose(
    R.prop("title"),
    R.find(R.propEq("nodeId", id))
  )(state)
);

export const getNodeCoordsById = (state, id) => (
  R.compose(
    R.prop("coords"),
    R.find(R.propEq("nodeId", id))
  )(state)
);

export const getNodeById = (state, id) => (
    R.find(R.propEq("nodeId", id))(state)
);

export const getConnections = (state) => (
  R.reduce((agregator, node) => (
    R.concat(
      agregator,
      R.map((out) => ({
        nodeId: node.nodeId + "-" + out,
        fromCoords: getNodePortsCoords(state, node.nodeId).output,
        toCoords: getNodePortsCoords(state, out).input,
        fromTitle: getNodeTitleById(state, node.nodeId),
        fromId: node.nodeId,
        toTitle: getNodeTitleById(state, out),
        toId: out
      }), node.output)
    )
  ), [], state)
);

export const getAllNodes = (state) => state;

export const getAudioNodePropsById = (state, id) => (
  id !== null
    ? R.compose(
        R.prop("props"),
        R.find(R.propEq("nodeId", id))
      )(state)
    : null
);

export const getAudioNodePluginIdById = (state, id) => (
  id !== null
    ? R.compose(
        R.prop("nodeTypeId"),
        R.find(R.propEq("nodeId", id))
      )(state)
    : null
);

export const makeActionListForNode = (node, dispatch) => {
  let res = [
    {
      title: "Delete",
      onClick: () => dispatch(deleteNode(node.nodeId))
    }
  ];
  if (node.type === NODE_TYPES.AUDIONODE) {
    res.push({
      title: "Edit",
      onClick: () => dispatch(toggleEditAudioNodeModal(node.nodeId))
    })
  }
  return res;
};

export const getNodePortsCoords = R.compose(getPortCoords, getNodeCoordsById);