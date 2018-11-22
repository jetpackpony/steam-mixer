import React, { Fragment } from 'react';
import Node from './Node';

const NodeList = ({ title, nodes, onDelete, onEdit, onAdd }) => {
  let nodesList = nodes.map(({ title, nodeId }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
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