import { connect } from 'react-redux';
import EditCompressor from './EditCompressor';
import { getIsModalOpen, getEditCompressorId, getCompressorPropsById } from '../store/reducers';
import { MODAL_TYPES } from '../store/constants';
import { changeCompressor, toggleEditCompressorModal } from '../store/actions';

const mapState = (state) => {
  const nodeId = getEditCompressorId(state);
  const compressorProps = getCompressorPropsById(state, nodeId) || {};
  return {
    nodeId,
    isOpen: getIsModalOpen(state, MODAL_TYPES.EDIT_COMPRESSOR),
    compressorProps
  };
};

const mapDispatch = {
  toggle: toggleEditCompressorModal,
  onCompressorPropsChange: changeCompressor
};

export default connect(mapState, mapDispatch)(EditCompressor);
