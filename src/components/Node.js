import React from 'react';
import { Rect, Text, Group } from 'react-konva';
import withContextMenu from './withContextMenu';

const Node = ({ nodeId, title, coords, onClick, onMove }) => {
  return (
      <Group
        x={coords.x}
        y={coords.y}
        onClick={onClick}
        draggable
        onDragMove={(event) => {
          const coords = {
            x: event.target.attrs.x,
            y: event.target.attrs.y,
          };
          onMove(nodeId, coords);
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

export default withContextMenu(Node);