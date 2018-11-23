import React, { Fragment } from 'react';
import Connection from './Connection';

const ConnectionList = ({ connections, onConnectionClick }) => {
  const connectionList = connections.map(
    ({ nodeId, fromCoords, toCoords, fromId, toId }) => (
      <Connection
        key={nodeId}
        fromCoords={fromCoords}
        toCoords={toCoords}
        fromId={fromId}
        toId={toId}
        onClick={onConnectionClick}
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