import { updateDeviceList } from './handlers';
import { ACTION_TYPES } from '../../actions';

describe("updateDeviceList", () => {
  it("returns a new list of inputs and outputs", () => {
    const listBefore = {
      "inputs": [
        {
          "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
          "kind": "audioinput",
          "label": "Internal Microphone (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        }
      ],
      "outputs": [
        {
          "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36",
          "kind": "audiooutput",
          "label": "Internal Speakers (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "2409773f188cda81b5306105d1817722f9089681a3b2c1b979f843398d3a15eb",
          "kind": "audiooutput",
          "label": "DELL S2415H (HDMI)",
          "groupId": "06579cae572e9e262076004e5208dd5c72a584bdac2ba7318cc4c30a997cced9"
        }
      ]
    }
    const action = {
      "type": "UPDATE_DEVICE_LIST",
      "devices": [
        {
          "deviceId": "default",
          "kind": "audioinput",
          "label": "Default - Internal Microphone (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
          "kind": "audioinput",
          "label": "Internal Microphone (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "0236debce6ea6eab0143b6f2e4a96072823351398e22b46e9f380d73eba618a8",
          "kind": "videoinput",
          "label": "FaceTime HD Camera",
          "groupId": "7e86b5d54b2d1b5d9d9498bb9b1a5fed4f3c3b5299063beb1f63385ffab94be3"
        },
        {
          "deviceId": "default",
          "kind": "audiooutput",
          "label": "Default - Headphones (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36",
          "kind": "audiooutput",
          "label": "Headphones (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "2409773f188cda81b5306105d1817722f9089681a3b2c1b979f843398d3a15eb",
          "kind": "audiooutput",
          "label": "DELL S2415H (HDMI)",
          "groupId": "06579cae572e9e262076004e5208dd5c72a584bdac2ba7318cc4c30a997cced9"
        }
      ]
    };
    const listAfter = {
      "inputs": [
        {
          "deviceId": "a4d0f43fd705b37335fa047ca5d0068f7c444cdf20e2ec474aa7b21b8408e502",
          "kind": "audioinput",
          "label": "Internal Microphone (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        }
      ],
      "outputs": [
        {
          "deviceId": "905e4745c43eedee796cab78bf6af3f44a76221597987e44e9c39047d8041c36",
          "kind": "audiooutput",
          "label": "Headphones (Built-in)",
          "groupId": "c84003a2e54b982f6dfa8aa79d91ac46efeb2fb24b2615150e43691c0ab8827e"
        },
        {
          "deviceId": "2409773f188cda81b5306105d1817722f9089681a3b2c1b979f843398d3a15eb",
          "kind": "audiooutput",
          "label": "DELL S2415H (HDMI)",
          "groupId": "06579cae572e9e262076004e5208dd5c72a584bdac2ba7318cc4c30a997cced9"
        }
      ]
    };

    expect(updateDeviceList(listBefore, action)).toEqual(listAfter);
    // The second call is here intentionally to cover the problem with
    // R.reduce caching the accumulator object
    expect(updateDeviceList(listBefore, action)).toEqual(listAfter);
  });
});