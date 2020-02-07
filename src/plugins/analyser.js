import { analyser } from 'virtual-audio-graph';

const vagCode = (output, props) => {
  return analyser(output);
};

export default {
  id: "analyser",
  title: "Analyser",
  props: [],
  vagCode
};