import * as R from 'ramda';
import { connect } from 'react-redux';
import ConnectionList from './ConnectionList';
import { getConnections } from '../../store/reducers';
import { deleteConnection } from '../../store/actions';

const mapState = (state) => ({
  connections: getConnections(state)
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  connections: R.map((connection) => ({
    ...connection,
    contextActions: [{
      title: "Delete Connection",
      onClick: () => dispatchProps.dispatch(
        deleteConnection(connection.fromId, connection.toId)
      )
    }]
  }), stateProps.connections)
});

export default connect(mapState, null, mergeProps)(ConnectionList);