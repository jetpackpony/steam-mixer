import React from 'react';
import { Arrow } from 'react-konva';
import withContextMenu from './withContextMenu';

const Connection = ({ fromCoords, toCoords, onClick }) => {
  return (
    <Arrow
      points={[fromCoords.x, fromCoords.y, toCoords.x, toCoords.y]}
      stroke="white"
      onClick={onClick}
    />
  );
};

export default withContextMenu(Connection);