import React from 'react';
import { Line } from 'react-konva';
import withContextMenu from './withContextMenu';
import { withTheme } from '@material-ui/core/styles';

const Connection = ({ fromCoords, toCoords, onClick, theme }) => {
  const from = [fromCoords.x, fromCoords.y];
  const to = [toCoords.x, toCoords.y];
  const controls = [fromCoords.x + 100, fromCoords.y, toCoords.x - 100, toCoords.y];
  const points = Array.prototype.concat(from, controls, to);
  return (
    <Line
      points={points}
      stroke={theme.palette.grey[600]}
      strokeWidth="2"
      onClick={onClick}
      lineCap="round"
      lineJoin="round"
      bezier={true}
    />
  );
};

export default withContextMenu(withTheme()(Connection));