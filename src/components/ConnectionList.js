import React, { Fragment } from 'react';
import Connection from './Connection';

const ConnectionList = ({ connections }) => {
  const connectionList = connections.map(
    ({ nodeId, fromCoords, toCoords, contextActions }) => (
      <Connection
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