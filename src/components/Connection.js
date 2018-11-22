import React from 'react';
import { Arrow, Text, Group } from 'react-konva';

const Connection = ({ nodeId, fromTitle, fromId, toTitle, toId, onDelete }) => {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  return (
    <Group x={x} y={y} >
      <Arrow
        points={[10, 0, 60, 0]}
        stroke="white"
      />
      <Text
        text={fromTitle}
        fill="white"
        x={0}
        y={20}
      />
      <Text
        text={toTitle}
        fill="white"
        x={0}
        y={40}
      />
    </Group>
  );
};

export default Connection;