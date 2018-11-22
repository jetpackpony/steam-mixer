import React from 'react';
import { EditButton } from './buttons';
import { Rect, Text, Group } from 'react-konva';

const Node = ({ title, nodeId, onDelete, onEdit, coords }) => {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  return (
    <Group x={x} y={y}>
      <Rect
        x={10}
        y={0}
        width={30}
        height={30}
        fill="red"
        shadowBlur={3}
        onClick={(e) => console.log("click:", nodeId)}
      />
      <Text
        text={title}
        fill="white"
        x={0}
        y={40}
      />
    </Group>
  );
};

export default Node;