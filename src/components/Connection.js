import React from 'react';
import { Arrow, Text, Group } from 'react-konva';

const Connection = ({ fromCoords, toCoords, fromId, toId, onClick }) => {
  return (
    <Arrow
      points={[fromCoords.x, fromCoords.y, toCoords.x, toCoords.y]}
      stroke="white"
      onClick={(event) => { 
        onClick({ fromId, toId }, { x: event.evt.pageX, y: event.evt.pageY })
      }}
    />
  );
};

export default Connection;