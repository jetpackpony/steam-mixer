const vagCode = (nodeId, props) => {
  console.log(`Running vagCode for ${nodeId} with props: `, props);
};

export default {
  id: "dynamicsCompressor",
  props: [
    {
      id: "attack",
      type: "number",
      min: 0,
      max: 1,
      step: 0.01,
      default: 0
    }
  ],
  vagCode
};