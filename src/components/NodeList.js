import React, { Fragment } from 'react';
import Node from './Node';

const NodeList = ({ nodes, onNodeMove, onOutputPortClick }) => {
  const nodesList = nodes.map(({ title, nodeId, type, coords, contextActions }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      nodeType={type}
      coords={coords}
      contextActions={contextActions}
      onMove={onNodeMove}
      onOutputPortClick={onOutputPortClick.bind(null, nodeId)}
    />
  ));
  return (
    <Fragment>
      {nodesList}
    </Fragment>
  )
};

export default NodeList;