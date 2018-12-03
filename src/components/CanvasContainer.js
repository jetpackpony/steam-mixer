import { connect } from 'react-redux';
import Canvas from './Canvas';
import {
  getIsConnectionCreatorActive,
  getDrawingConnectionNodeId,
  getNodePortsCoords
} from '../store/reducers';

const mapState = (state) => {
  const drawingNodeId = getDrawingConnectionNodeId(state);
  return {
    isConnectionCreatorActive: getIsConnectionCreatorActive(state),
    originCoords: (drawingNodeId)
      ? getNodePortsCoords(state, drawingNodeId).output
      : { x: 0, y: 0 }
  };
};

export default connect(mapState)(Canvas);