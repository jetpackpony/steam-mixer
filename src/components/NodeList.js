import React from 'react';
import Node from './Node';
import { AddButton } from './buttons';

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
    <div className="list">
      <div className="list-header">{title}</div>
      {nodesList}
      <AddButton onClick={onAdd} />
    </div>
  )
};

export default NodeList;