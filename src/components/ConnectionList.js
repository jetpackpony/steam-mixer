import React, { Fragment } from 'react';
import Connection from './Connection';

const ConnectionList = ({ title, connections, onDelete, onAdd }) => {
  const connectionList = connections.map(({ nodeId, fromCoords, toCoords }) => (
    <Connection
      key={nodeId}
      fromCoords={fromCoords}
      toCoords={toCoords}
    />
  ));
  return (
    <Fragment>
      {connectionList}
    </Fragment>
  );
};

export default ConnectionList;