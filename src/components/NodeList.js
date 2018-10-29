import React from 'react';
import Node from './Node';

const NodeList = ({ title, nodes, onDelete, onEdit }) => {
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
    <div className="list">
      <div className="list-header">{title}</div>
      {nodesList}
    </div>
  )
};

export default NodeList;