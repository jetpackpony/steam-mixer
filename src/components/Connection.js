import React from 'react';
import { Line, Group, Circle } from 'react-konva';
import withContextMenu from './withContextMenu';
import { withTheme } from '@material-ui/core/styles';
import { getPortCoords } from './Node';

const Connection = ({ fromCoords, toCoords, onClick, theme }) => {
  const fromPortCoords = getPortCoords(fromCoords).output;
  const toPortCoords = getPortCoords(toCoords).input;
  const from = [fromPortCoords.x, fromPortCoords.y];
  const to = [toPortCoords.x, toPortCoords.y];
  const controls = [from[0] + 100, from[1], to[0] - 100, to[1]];
  const points = Array.prototype.concat(from, controls, to);
  const lineColor = theme.palette.grey[600];
  return (
    <Group onClick={onClick}>
      <Circle
        x={fromPortCoords.x}
        y={fromPortCoords.y}
        fill={lineColor}
        radius={3}
        strokeEnabled={false}
      />
      <Circle
        x={toPortCoords.x}
        y={toPortCoords.y}
        fill={lineColor}
        radius={3}
        strokeEnabled={false}
      />
      <Line
        points={points}
        stroke={lineColor}
        strokeWidth="2"
        lineCap="round"
        lineJoin="round"
        bezier={true}
      />
      {
        // The second line is here for easier clicability
      }
      <Line
        points={points}
        stroke="transparent"
        strokeWidth="10"
        lineCap="round"
        lineJoin="round"
        bezier={true}
      />
    </Group>
  );
};

export default withContextMenu(withTheme()(Connection));