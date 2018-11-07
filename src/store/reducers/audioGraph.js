import { DEVICE_TYPES } from '../../components/WebAudioEngine/constants';
import { ACTION_TYPES } from '../actions';

/*
let initState = {
  audioGraph: {},
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
      "1"
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
    default:
      return state;
  }
};

export default audioGraph;