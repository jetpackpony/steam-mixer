import { dynamicsCompressor } from 'virtual-audio-graph';

const vagCode = (output, props) => {
  return dynamicsCompressor(output, props);
};

/*

      "props": {
        attack: 0,
        knee: 40,
        ratio: 12,
        release: 0.25,
        threshold: -40
      }
      */
export default {
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
    }
  ],
  vagCode
};