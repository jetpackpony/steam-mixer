import React, { Fragment } from 'react';
import Connection from './Connection';
import withContextMenu from './withContextMenu';

const ConnectionWithContextMenu = withContextMenu(Connection);

const ConnectionList = ({ connections }) => {
  const connectionList = connections.map(
    ({ nodeId, fromCoords, toCoords, contextActions }) => (
      <ConnectionWithContextMenu
        key={nodeId}
        fromCoords={fromCoords}
        toCoords={toCoords}
        contextActions={contextActions}
      />
    )
  );
  return (
    <Fragment>
      {connectionList}
    </Fragment>
  );
};

export default ConnectionList;