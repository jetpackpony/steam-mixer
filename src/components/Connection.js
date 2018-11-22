import React from 'react';
import { Arrow, Text, Group } from 'react-konva';

const Connection = ({ fromCoords, toCoords }) => {
  return (
    <Arrow
      points={[fromCoords.x, fromCoords.y, toCoords.x, toCoords.y]}
      stroke="white"
    />
  );
};

export default Connection;