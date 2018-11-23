import { connect } from 'react-redux';
import ConnectionList from './ConnectionList';
import { getConnections } from '../store/reducers';
import { toggleConnectionContextMenu } from '../store/actions';

const mapState = (state) => ({
  connections: getConnections(state)
});

const mapDispatch = {
  onConnectionClick: toggleConnectionContextMenu
};

export default connect(mapState, mapDispatch)(ConnectionList);