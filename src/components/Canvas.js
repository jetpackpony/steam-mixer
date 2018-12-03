import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import NodeListContainer from './NodeListContainer';
import ConnectionListContainer from './ConnectionListContainer';
import classes from './Canvas.module.scss';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageWidth: window.innerWidth,
      stageHeight: window.innerHeight
    };
    this.resizeStage = this.resizeStage.bind(this);
    this.container = React.createRef();
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

  render() {
    return (
      <section className={classes.container} ref={this.container}>
        <Stage
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          draggable={true}
        >
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