import { connect } from 'react-redux';
import ConnectionList from './ConnectionList';
import { getConnections } from '../store/reducers';
import { deleteConnection, toggleAddConnectionModal } from '../store/actions';

const mapState = (state) => ({
  nodes: getConnections(state)
});

const mapDispatch = {
  onDelete: deleteConnection,
  onAdd: toggleAddConnectionModal
};

export default connect(mapState, mapDispatch)(ConnectionList);