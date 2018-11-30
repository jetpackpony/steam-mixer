import React from 'react';
import { Circle, Text, Group } from 'react-konva';
import withContextMenu from './withContextMenu';
import { withTheme } from '@material-ui/core/styles';

const getNodeIconName = (nodeType) => (
  {
    SOURCE: "mic",
    DESTINATION: "headset",
    AUDIONODE: "equalizer"
  }[nodeType]
);

const Node = ({ nodeId, nodeType, title, coords, onClick, onMove, theme }) => {
  const secondaryColor = theme.palette.secondary[theme.palette.type];
  const fontColor = theme.typography.body1.color;
  const circleRadius = 28;
  const iconSize = 24;
  const labelWidth = circleRadius * 4;
  const labelMargin = 10;
  const iconName = getNodeIconName(nodeType);

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