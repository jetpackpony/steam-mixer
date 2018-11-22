import React, { Fragment } from 'react';
import Connection from './Connection';

const ConnectionList = ({ title, nodes, onDelete, onAdd }) => {
  let nodesList = nodes.map(({ nodeId, fromTitle, fromId, toTitle, toId }) => (
    <Connection
      key={nodeId}
      fromTitle={fromTitle}
      fromId={fromId}
      toTitle={toTitle}
      toId={toId}
      nodeId={nodeId}
      onDelete={onDelete}
    />
  ));
  return (
    <Fragment>
      {nodesList}
    </Fragment>
  );
};

export default ConnectionList;