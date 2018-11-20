import { dynamicsCompressor } from 'virtual-audio-graph';

const vagCode = (output, props) => {
  return dynamicsCompressor(output, props);
};

export default {
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
      id: "knee",
      title: "Knee",
      default: 40,
      fieldProps: {
        type: "number",
        min: 0,
        max: 100,
        step: 1,
      }
    },
    {
      id: "ratio",
      title: "Ratio",
      default: 12,
      fieldProps: {
        type: "number",
        min: 0,
        max: 15,
        step: 1,
      }
    },
    {
      id: "release",
      title: "Release",
      default: 0.25,
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
      default: -40,
      fieldProps: {
        type: "number",
        min: -100,
        max: 100,
        step: 1,
      }
    },
  ],
  vagCode
};