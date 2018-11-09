import { deleteConnection } from './handlers';
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