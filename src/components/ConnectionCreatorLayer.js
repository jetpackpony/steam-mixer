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
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("keyup", this.onKeyUp);
    this.onMouseMove();
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onMouseMove() {
    const pointerCoords = this.props.getStagePointerPosition();
    if (pointerCoords !== null) {
      this.setState({
        pointerCoords
      });
    }
  }

  onKeyUp(e) {
    // If escape is pressed, cancel creating connection
    if (e.keyCode === 27) {
      this.props.cancelCreatingConnection();
    }
  }

  render() {
    return (
      <Layer>
        <Connection
          fromCoords={this.props.originCoords}
          toCoords={this.state.pointerCoords}
          onClick={(e) => {
            // If we get the right click
            if (e.evt.button === 2) {
              this.props.cancelCreatingConnection();
            }
          }}
        />
      </Layer>
    );
  }
}

export default ConnectionCreatorLayer;