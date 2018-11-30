import React from 'react';
import * as R from 'ramda';
import { Circle, Text, Group, Arc } from 'react-konva';
import withContextMenu from './withContextMenu';
import { withTheme } from '@material-ui/core/styles';
import { NODE_TYPES } from '../store/constants';

const circleRadius = 28;
const iconSize = 24;
const labelWidth = circleRadius * 4;
const labelMargin = 10;
const portMargin = 10;
const portRadius = 5;
const portWidth = 2;

const getNodeIconName = (nodeType) => (
  {
    [NODE_TYPES.SOURCE]: "mic",
    [NODE_TYPES.DESTINATION]: "headset",
    [NODE_TYPES.AUDIONODE]: "equalizer"
  }[nodeType]
);

export const getPortCoords = ({ x, y }) => ({
  input: {
    x: x - (circleRadius + portMargin),
    y: y 
  },
  output: {
    x: x + circleRadius + portMargin,
    y: y
  }
});

const hasInputs = (type) => (
  R.contains(type, [NODE_TYPES.AUDIONODE, NODE_TYPES.DESTINATION])
);

const hasOutputs = (type) => (
  R.contains(type, [NODE_TYPES.AUDIONODE, NODE_TYPES.SOURCE])
);

const Node = ({ nodeId, nodeType, title, coords, onClick, onMove, theme }) => {
  const secondaryColor = theme.palette.secondary[theme.palette.type];
  const fontColor = theme.typography.body1.color;
  const iconName = getNodeIconName(nodeType);
  const portCoords = getPortCoords({ x: 0, y: 0 });

  console.log(theme);
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
        <Circle
          x={0}
          y={0}
          fill={secondaryColor}
          radius={circleRadius}
          strokeEnabled={false}
          shadowColor="rgba(0, 0, 0, 0.2)"
          shadowBlur="5"
          shadowOffset={{ x: 0, y: 3 }}
        />
        {
          (hasInputs(nodeType))
            ? <Arc
              x={portCoords.input.x}
              y={portCoords.input.y}
              angle={160}
              innerRadius={portRadius}
              outerRadius={portRadius + portWidth}
              fill={secondaryColor}
              strokeEnabled={false}
              lineCap="round"
              lineJoin="round"
              rotation={-80}
            />
            : null
        }
        {
          (hasOutputs(nodeType))
            ? <Arc
              x={portCoords.output.x}
              y={portCoords.output.y}
              angle={160}
              innerRadius={portRadius}
              outerRadius={portRadius + portWidth}
              fill={secondaryColor}
              strokeEnabled={false}
              lineCap="round"
              lineJoin="round"
              rotation={100}
            />
            : null
        }
        <Text
          x={-circleRadius}
          y={-circleRadius}
          width={circleRadius * 2}
          height={circleRadius * 2}
          text={iconName}
          fill={fontColor}
          fontFamily="Material Icons"
          fontSize={iconSize}
          align="center"
          verticalAlign="middle"
        />
        <Text
          text={title}
          fill={fontColor}
          fontFamily={theme.typography.fontFamily}
          fontSize={theme.typography.fontSize}
          x={-labelWidth / 2}
          y={circleRadius + labelMargin}
          width={labelWidth}
          align="center"
        />
      </Group>
  );
};

export default withContextMenu(withTheme()(Node));