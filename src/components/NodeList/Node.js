import React, { Fragment } from 'react';
import * as R from 'ramda';
import { Circle, Text, Group, Arc, Rect } from 'react-konva';
import withContextMenu from '../withContextMenu';
import { withTheme } from '@material-ui/core/styles';
import { NODE_TYPES } from '../../store/constants';

const circleRadius = 28;
const iconSize = 24;
const labelWidth = circleRadius * 4;
const labelHeight = 40;
const labelMargin = 10;
const portMargin = 10;
const portRadius = 5;
const portWidth = 2;

const PORT_TYPES = {
  OUTPUT: "OUTPUT",
  INPUT: "INPUT",
};

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

const makePort = R.curry((color, portType, coords, onClick) => (
  <Fragment>
    <Arc
      x={coords.x}
      y={coords.y}
      angle={160}
      innerRadius={portRadius}
      outerRadius={portRadius + portWidth}
      fill={color}
      strokeEnabled={false}
      lineCap="round"
      lineJoin="round"
      rotation={portType === PORT_TYPES.INPUT ? -80 : 100}
    />
    <Rect
      x={coords.x - (portRadius + portWidth)}
      y={coords.y - (portRadius + portWidth)}
      width={(portRadius + portWidth) * 2}
      height={(portRadius + portWidth) * 2}
      fill="transparent"
      onClick={onClick || null}
    />
  </Fragment>
));

const Node = ({
  nodeId, nodeType, title, coords, theme,
  onClick, onMove, onOutputPortClick, onInputPortClick
}) => {
  const secondaryColor = theme.palette.secondary[theme.palette.type];
  const fontColor = theme.typography.body1.color;
  const iconName = getNodeIconName(nodeType);
  const portCoords = getPortCoords({ x: 0, y: 0 });
  return (
      <Group
        x={coords.x}
        y={coords.y}
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
            ? makePort(
              secondaryColor,
              PORT_TYPES.INPUT,
              portCoords.input,
              onInputPortClick
            )
            : null
        }
        {
          (hasOutputs(nodeType))
            ? makePort(
              secondaryColor,
              PORT_TYPES.OUTPUT,
              portCoords.output,
              onOutputPortClick
            )
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
        <Rect
          x={-circleRadius}
          y={-circleRadius}
          width={circleRadius * 2}
          height={circleRadius * 2 + labelMargin + labelHeight}
          fill="transparent"
          onClick={onClick}
        />
      </Group>
  );
};

export default withContextMenu(withTheme()(Node));