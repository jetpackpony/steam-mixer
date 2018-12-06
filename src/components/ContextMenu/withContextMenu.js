import React, { Fragment, Component } from 'react';
import ContextMenu from './ContextMenu';
import KonvaPortal from './KonvaPortal';

const withContextMenu = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        coords: { x: 0, y: 0 },
      };
      this.toggle = this.toggle.bind(this);
      this.onClick = this.onClick.bind(this);
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    onClick(event) {
      this.setState({
        isOpen: true,
        coords: { x: event.evt.pageX, y: event.evt.pageY }
      });
    }

    render() {
      const { contextActions, ...rest } = this.props;
      return (
        <Fragment>
          <WrappedComponent {...rest} onClick={this.onClick} />
          <KonvaPortal>
            <ContextMenu
              isOpen={this.state.isOpen}
              coords={this.state.coords}
              actions={contextActions}
              toggle={this.toggle}
            />
          </KonvaPortal>
        </Fragment >
      );
    }
  };
};

export default withContextMenu;