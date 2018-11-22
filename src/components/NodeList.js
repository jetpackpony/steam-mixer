import React, { Fragment } from 'react';
import Node from './Node';

const NodeList = ({ nodes, onNodeClick }) => {
  let nodesList = nodes.map(({ title, nodeId, coords }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      coords={coords}
      onClick={onNodeClick}
    />
  ));
  return (
    <Fragment>
      {nodesList}
    </Fragment>
  )
};

export default NodeList;