import React from 'react';
import { Rect, Text, Group } from 'react-konva';

const Node = ({ title, nodeId, coords }) => {
  return (
    <Group x={coords.x} y={coords.y}>
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