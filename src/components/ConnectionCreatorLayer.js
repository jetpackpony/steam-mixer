import React, { Component } from 'react';
import { Layer } from 'react-konva';
import Connection from './Connection';

class ConnectionCreatorLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerCoords: { x: 0, y: 0 }
    };
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove);
    this.onMouseMove();
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove() {
    const pointerCoords = this.props.getStagePointerPosition();
    if (pointerCoords !== null) {
      this.setState({
        pointerCoords
      });
    }
  }

  render() {
    return (
      <Layer>
        <Connection
          fromCoords={this.props.originCoords}
          toCoords={this.state.pointerCoords}
        />
      </Layer>
    );
  }
}

export default ConnectionCreatorLayer;