import * as R from 'ramda';
import { DEVICE_TYPES } from '../../components/WebAudioEngine/constants';
import { ACTION_TYPES } from '../actions';

const getNodeIndexByID = (id, arr) => (
  R.findIndex(R.propEq("nodeId", id))(arr)
);
/*
let initState = {
  audioGraph: []
};
*/
let initState = [
  {
    "nodeId": "0",
    "title": "First input",
    "type": DEVICE_TYPES.SOURCE,
    "output": [
      "3"
    ],
    "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502"
  },
  {
    "nodeId": "1",
    "title": "First output",
    "type": DEVICE_TYPES.DESTINATION,
    "output": [],
    "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36"
  },
  {
    "nodeId": "2",
    "title": "Second output",
    "type": DEVICE_TYPES.DESTINATION,
    "output": [],
    "deviceId": "2409773f188cda81b5306105d1817722f9089681a3b2c1b979f843398d3a15eb"
  },
  {
    "nodeId": "3",
    "title": "Gain",
    "type": "node",
    "constructor": "gain",
    "output": [
    ],
    "props": {
      "gain": 1
    }
  }
];

const audioGraph = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ENDPOINT:
      return [
        ...state,
        {
          "nodeId": action.nodeId,
          "title": action.title,
          "type": action.deviceType,
          "output": [],
          "deviceId": action.device.deviceId
        }
      ];
    case ACTION_TYPES.ADD_GAIN_NODE:
      return [
        ...state,
        {
          "nodeId": action.nodeId,
          "title": action.title,
          "type": "node",
          "output": [],
          "constructor": "gain",
          "props": {
            "gain": 1
          }
        }
      ];
    case ACTION_TYPES.ADD_CONNECTION:
      var fromIndex = getNodeIndexByID(action.fromId, state);
      return [
        ...R.slice(0, fromIndex, state),
        {
          ...state[fromIndex],
          output: R.uniq([
            ...state[fromIndex].output,
            action.toId
          ])
        },
        ...R.slice(fromIndex + 1, Infinity, state),
      ];
    case ACTION_TYPES.DELETE_NODE:
      var nodeIndex = getNodeIndexByID(action.nodeId, state);
      return R.map((node) => ({
        ...node,
        output: R.without([action.nodeId], node.output)
      }), R.remove(nodeIndex, 1, state));
    case ACTION_TYPES.DELETE_CONNECTION:
      var fromIndex = getNodeIndexByID(action.fromId, state);
      return [
        ...R.slice(0, fromIndex, state),
        {
          ...state[fromIndex],
          output: R.without([action.toId], ...state[fromIndex].output)
        },
        ...R.slice(fromIndex + 1, Infinity, state),
      ];
    case ACTION_TYPES.CHANGE_GAIN:
      var nodeIndex = getNodeIndexByID(action.nodeId, state);
      return [
        ...R.slice(0, nodeIndex, state),
        {
          ...state[nodeIndex],
          props: {
            ...state[nodeIndex].props,
            gain: action.value
          }
        },
        ...R.slice(nodeIndex + 1, Infinity, state),
      ];
    default:
      return state;
  }
};

export default audioGraph;

export const getInputNodes = (state) => (
  R.filter((node) => (node.type === DEVICE_TYPES.SOURCE), state)
);

export const getOutputNodes = (state) => (
  R.filter((node) => (node.type === DEVICE_TYPES.DESTINATION), state)
);

export const getAudioNodes = (state) => (
  R.filter((node) => (node.type === "node"), state)
);

export const getNodeTitleById = (state, id) => (
  R.compose(
    R.prop("title"),
    R.find(R.propEq("nodeId", id))
  )(state)
);

export const getConnections = (state) => (
  R.reduce((agregator, node) => (
    R.concat(
      agregator,
      R.map((out) => ({
        nodeId: node.nodeId + "-" + out,
        fromTitle: getNodeTitleById(state, node.nodeId),
        fromId: node.nodeId,
        toTitle: getNodeTitleById(state, out),
        toId: out
      }), node.output)
    )
  ), [], state)
);

export const getGainValueById = (state, id) => (
  id !== null
    ? R.compose(
        R.path(["props", "gain"]),
        R.find(R.propEq("nodeId", id))
      )(state)
    : null
);