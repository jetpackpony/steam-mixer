import React from 'react';
import { Line, Group, Circle } from 'react-konva';
import { withTheme } from '@material-ui/core/styles';

const makeBezierControls = (from, to) => (
  [from[0] + 100, from[1], to[0] - 100, to[1]]
);

const makePointsList = (fromCoords, toCoords) => {
  const from = [fromCoords.x, fromCoords.y];
  const to = [toCoords.x, toCoords.y];
  const controls = makeBezierControls(from, to);
  return Array.prototype.concat(from, controls, to);
};

const Connection = ({ fromCoords, toCoords, onClick, theme }) => {
  const points = makePointsList(fromCoords, toCoords);
  const lineColor = theme.palette.grey[600];
  return (
    <Group onClick={onClick}>
      <Circle
        x={fromCoords.x}
        y={fromCoords.y}
        fill={lineColor}
        radius={3}
        strokeEnabled={false}
      />
      <Circle
        x={toCoords.x}
        y={toCoords.y}
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
        (onClick)
          ? <Line
            points={points}
            stroke="transparent"
            strokeWidth="10"
            lineCap="round"
            lineJoin="round"
            bezier={true}
          />
          : null
      }
    </Group>
  );
};

export default withTheme()(Connection);