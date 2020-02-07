import { connect } from 'react-redux';
import WebAudioEngine from './component';
import { getAllNodes, getAllDevices } from '../../store/reducers';
import { updateDeviceList, openPermissionsModal } from '../../store/actions';

const mapState = (state) => ({
  webAudioDevices: getAllDevices(state),
  audioGraph: getAllNodes(state)
});

const mapDispatch = {
  onDevicesLoaded: updateDeviceList,
  onNeedsAudioPermissions: openPermissionsModal
};

export default connect(mapState, mapDispatch)(WebAudioEngine);