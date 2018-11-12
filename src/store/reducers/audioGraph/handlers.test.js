import { deleteConnection, updateDeviceList } from './handlers';
import { ACTION_TYPES } from '../../actions';

describe("deleteConnection", () => {
  it("removes the connection from audioGraph", () => {
    const graphBefore = [{
      "nodeId": "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54",
      "output": ["f70cf130-7a40-495d-90cc-eb33924c13d8"],
    }, {
      "nodeId": "f70cf130-7a40-495d-90cc-eb33924c13d8",
      "output": [],
    }];
    const action = {
      "type": ACTION_TYPES.DELETE_CONNECTION,
      "fromId": "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54",
      "toId": "f70cf130-7a40-495d-90cc-eb33924c13d8"
    };
    const graphAfter = [{
      "nodeId": "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54",
      "output": [],
    }, {
      "nodeId": "f70cf130-7a40-495d-90cc-eb33924c13d8",
      "output": [],
    }];

    expect(deleteConnection(graphBefore, action)).toEqual(graphAfter);
  });
});

describe("updateDeviceList", () => {
  it("removes the inactive devices and connections to it", () => {
    const graphBefore = [{
      "nodeId": "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54",
      "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36",
      "output": []
    }, {
      "nodeId": "f70cf130-7a40-495d-90cc-eb33924c13d8",
      "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
      "output": [
        "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54",
        "35fa047ca5d0068f7c444cdf20e2ec474aa7b"
      ]
    }, {
      "nodeId": "35fa047ca5d0068f7c444cdf20e2ec474aa7b",
      "output": [
        "77b915f8-8289-4dd1-a5e8-5a8dd2c8da54"
      ]
    }];
    const action = {
      "type": ACTION_TYPES.UPDATE_DEVICE_LIST,
      "devices": [
        {
          "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
          "kind": "audioinput",
          "label": "Internal Microphone (Built-in)",
          "groupId": "b1693a0e508913ea1cc7073060a90eee692bd1cb166a2e631d4bee777731a389"
        },
        {
          "deviceId": "4d1fde33c762ff9b0aa3f5c7862358f87fc231c654d990786c141760ec338832",
          "kind": "audioinput",
          "label": "Soundflower (2ch)",
          "groupId": "21e4b8b08435fd57cfd05e65b1f2c5bf7e7c46dcf66d9bbea17e4c1165f18835"
        }
      ]
    };
    const graphAfter = [{
      "nodeId": "f70cf130-7a40-495d-90cc-eb33924c13d8",
      "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
      "output": [
        "35fa047ca5d0068f7c444cdf20e2ec474aa7b"
      ]
    }, {
      "nodeId": "35fa047ca5d0068f7c444cdf20e2ec474aa7b",
      "output": []
    }];

    expect(updateDeviceList(graphBefore, action)).toEqual(graphAfter);
  });
});