import { connect } from 'react-redux';
import EditAudioNode from './component';
import {
  getIsModalOpen,
  getEditAudioNodeId,
  getAudioNodePropsById,
  getAudioNodePluginIdById
} from '../../store/reducers';
import { MODAL_TYPES } from '../../store/constants';
import {
  toggleEditAudioNodeModal,
  editAudioNode
} from '../../store/actions';
import { bindPluginUtils } from '../../utils';
import plugins from '../../plugins';
const pluginUtils = bindPluginUtils(plugins);

const mapState = (state) => {
  const nodeId = getEditAudioNodeId(state);
  const pluginId = getAudioNodePluginIdById(state, nodeId);
  const fields = (pluginId)
    ? pluginUtils.getPluginByTypeId(pluginId).props
    : [];
  const values = getAudioNodePropsById(state, nodeId) || {};
  return {
    nodeId,
    isOpen: getIsModalOpen(state, MODAL_TYPES.EDIT_AUDIO_NODE),
    fields,
    values
  };
};

const mapDispatch = {
  toggle: toggleEditAudioNodeModal,
  onAudioNodePropsChange: editAudioNode
};

export default connect(mapState, mapDispatch)(EditAudioNode);
