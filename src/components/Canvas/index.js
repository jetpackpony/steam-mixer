import { connect } from 'react-redux';
import Canvas from './component';
import {
  getIsConnectionCreatorActive,
  getDrawingConnectionNodeId,
  getNodePortsCoords
} from '../../store/reducers';
import { createConnectionEnd } from '../../store/actions';

const mapState = (state) => {
  const drawingNodeId = getDrawingConnectionNodeId(state);
  return {
    isConnectionCreatorActive: getIsConnectionCreatorActive(state),
    originCoords: (drawingNodeId)
      ? getNodePortsCoords(state, drawingNodeId).output
      : { x: 0, y: 0 }
  };
};

const mapDispatch = {
  cancelCreatingConnection: createConnectionEnd
};

export default connect(mapState, mapDispatch)(Canvas);