import React, { Fragment } from 'react';
import { EditButton } from './buttons';
import { Rect, Text } from 'react-konva';

const Node = ({ title, nodeId, onDelete, onEdit, coords }) => {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  return (
    <Fragment>
      <Rect
        x={x}
        y={y}
        width={30}
        height={30}
        fill="red"
        shadowBlur={3}
        onClick={(e) => console.log("click:", nodeId)}
      />
      <Text
        text={title}
        fill="white"
        x={x - 10}
        y={y + 40}
      />
    </Fragment>
  );
};

export default Node;