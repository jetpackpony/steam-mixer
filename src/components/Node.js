import React from 'react';
import { Rect, Text, Group } from 'react-konva';

const Node = ({ title, nodeId, coords, onClick }) => {
  return (
    <Group
      x={coords.x}
      y={coords.y}
      onClick={(event) => { 
        onClick(nodeId, { x: event.evt.pageX, y: event.evt.pageY })
      }}
    >
      <Rect
        x={10}
        y={0}
        width={30}
        height={30}
        fill="red"
        shadowBlur={3}
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