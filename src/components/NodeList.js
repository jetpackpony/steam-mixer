import React, { Fragment } from 'react';
import Node from './Node';

const NodeList = ({ nodes, onDelete, onEdit }) => {
  let nodesList = nodes.map(({ title, nodeId, coords }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      coords={coords}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ));
  return (
    <Fragment>
      {nodesList}
    </Fragment>
  )
};

export default NodeList;