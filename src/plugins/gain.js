const vagCode = (nodeId, props) => {
  console.log(`Running vagCode for ${nodeId} with props: `, props);
};

export default {
  id: "gain",
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
  vagCode
};