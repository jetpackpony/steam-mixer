import React, { Fragment } from 'react';
import { Arrow, Text} from 'react-konva';

const Connection = ({ nodeId, fromTitle, fromId, toTitle, toId, onDelete }) => {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);

  return (
    <Fragment>
      <Arrow
        points={[x, y, x + 60, y]}
        stroke="white"
      />
      <Text
        text={fromTitle}
        fill="white"
        x={x - 10}
        y={y + 20}
      />
      <Text
        text={toTitle}
        fill="white"
        x={x - 10}
        y={y + 40}
      />
    </Fragment>
  );
};

export default Connection;