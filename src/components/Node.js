import React from 'react';
import { DeleteButton, EditButton } from './buttons';

const Node = ({ title, nodeId, onDelete, onEdit }) => {
  let edit =
    typeof onEdit === "function"
      ? <EditButton onClick={() => onEdit(nodeId)} />
      : null;

  return (
    <div id={`node-${nodeId}`}>
      <DeleteButton onClick={() => onDelete(nodeId)} />
      {nodeId}
      {title}
      {edit}
    </div>
  );
};

export default Node;