import { gain } from 'virtual-audio-graph';

const vagCode = (output, props) => {
  return gain(output, props);
};

export default {
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
  vagCode
};