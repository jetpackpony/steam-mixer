import React from 'react';
import Node from './Node';

const NodeList = ({ nodes, onDelete, onEdit }) => {
  return nodes.map(({ title, nodeId }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ));
};

export default NodeList;