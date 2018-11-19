import { bindPluginUtils } from './utils';

const plugins = [{
  id: "dynamicsCompressor",
  title: "Compressor",
  props: [
    {
      id: "attack",
      type: "number",
      min: 0,
      max: 1,
      step: 0.01,
      default: 0
    },
    {
      id: "threshold",
      type: "number",
      min: 0,
      max: 50,
      step: 0.05,
      default: 10
    }
  ],
  vagCode: () => {}
}, {
  id: "gain",
  title: "Gain",
  props: [
    {
      id: "gain",
      type: "number",
      min: 0,
      max: 10,
      step: 0.05,
      default: 1
    }
  ],
  vagCode: () => {}
}];
const utils = bindPluginUtils(plugins);

describe("getPluginByTypeId", () => {
  it("returns the correct plugin", () => {
    const res = utils.getPluginByTypeId("dynamicsCompressor");
    expect(res).toEqual(plugins[0]);
  });
});

describe("getDefaultPropsForPlugin", () => {
  it("returns the correct default props", () => {
    const res = utils.getDefaultPropsForPlugin("dynamicsCompressor");
    const expected = {
      "attack": 0,
      "threshold": 10
    };
    expect(res).toEqual(expected);
  });
});