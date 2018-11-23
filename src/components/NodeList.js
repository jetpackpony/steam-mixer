import React, { Fragment } from 'react';
import Node from './Node';

const NodeList = ({ nodes }) => {
  const nodesList = nodes.map(({ title, nodeId, coords, contextActions }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      coords={coords}
      contextActions={contextActions}
    />
  ));
  return (
    <Fragment>
      {nodesList}
    </Fragment>
  )
};

export default NodeList;