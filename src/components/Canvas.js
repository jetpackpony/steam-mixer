import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import NodeListContainer from './NodeListContainer';
import ConnectionListContainer from './ConnectionListContainer';
import classes from './Canvas.module.scss';
import ConnectionCreatorLayer from './ConnectionCreatorLayer';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageWidth: window.innerWidth,
      stageHeight: window.innerHeight
    };
    this.resizeStage = this.resizeStage.bind(this);
    this.getStagePointerPosition = this.getStagePointerPosition.bind(this);
    this.container = React.createRef();
    this.stage = React.createRef();
  }

  componentDidMount() {
    this.resizeStage();
    window.addEventListener("resize", this.resizeStage);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeStage);
  }

  resizeStage() {
    const cont = this.container;
    this.setState({
      stageWidth: cont.current.offsetWidth,
      stageHeight: cont.current.offsetHeight
    });
  }

  getStagePointerPosition() {
    const pos = this.stage.current.getPointerPosition();
    if (!pos) {
      return null;
    }
    const { x: xPointer, y: yPointer } = this.stage.current.getPointerPosition();
    const { x: xScroll = 0, y: yScroll = 0 } = this.stage.current.attrs;
    return {
      x: xPointer - xScroll,
      y: yPointer - yScroll
    };
  }

  render() {
    const { isConnectionCreatorActive, originCoords } = this.props;
    return (
      <section className={classes.container} ref={this.container}>
        <Stage
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          draggable={true}
          ref={this.stage}
          onContentContextMenu={(e) => e.evt.preventDefault()}
        >
          {
            (isConnectionCreatorActive)
              ? <ConnectionCreatorLayer
                  originCoords={originCoords}
                  getStagePointerPosition={this.getStagePointerPosition}
                  cancelCreatingConnection={this.props.cancelCreatingConnection}
                />
              : null
          }
          <Layer>
            <ConnectionListContainer title="Connections" />
            <NodeListContainer />
          </Layer>
        </Stage>
      </section>
    );
  };
}

export default Canvas;