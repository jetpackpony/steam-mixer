import { bindPluginUtils } from './utils';

const plugins = [{
  id: "dynamicsCompressor",
  title: "Compressor",
  props: [
    {
      id: "attack",
      title: "Attack",
      default: 0,
      fieldProps: {
        type: "number",
        min: 0,
        max: 1,
        step: 0.01,
      }
    },
    {
      id: "threshold",
      title: "Threshold",
      default: 10,
      fieldProps: {
        type: "number",
        min: -100,
        max: 100,
        step: 1,
      }
    }
  ],
  vagCode: () => {}
}, {
  id: "gain",
  title: "Gain",
  props: [
    {
      id: "gain",
      title: "Gain",
      default: 1,
      fieldProps: {
        type: "number",
        min: 0,
        max: 10,
        step: 0.05,
      },
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