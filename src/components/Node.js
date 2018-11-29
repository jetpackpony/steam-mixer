import React from 'react';
import { Rect, Text, Group } from 'react-konva';
import withContextMenu from './withContextMenu';
import { withTheme } from '@material-ui/core/styles';

const Node = ({ nodeId, title, coords, onClick, onMove, theme }) => {
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
          fill={theme.typography.body1.color}
          fontFamily={theme.typography.fontFamily}
          fontSize={theme.typography.fontSize}
          x={0}
          y={40}
        />
      </Group>
  );
};

export default withContextMenu(withTheme()(Node));