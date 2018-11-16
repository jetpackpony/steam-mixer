import React, { Component, Fragment } from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

class AddAudioNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      nodeTypeId: ""
    };

    this.onNodeTypeSelected = this.onNodeTypeSelected.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNodeTypeSelected(event) {
    this.setState({ nodeTypeId: event.target.value });
  }

  onTitleChanged(event) {
    this.setState({ title: event.target.value });
  }

  onSubmit() {
    this.props.toggle();
    this.props.onCreate(
      this.state.title,
      this.state.nodeTypeId
    );
  }

  render() {
    const { nodeTypesList, isOpen, toggle } = this.props;
    let options = nodeTypesList.map((nodeType) => (
      <option key={nodeType.id} value={nodeType.id}>
        {nodeType.title}
      </option>
    ));
    return (
      <ModalBox
        isOpen={isOpen}
        toggle={toggle}
        header="Add an audio node"
        body={
          <Fragment>
            <input value={this.state.title} onChange={this.onTitleChanged} />
            <select value={this.state.nodeTypeId} onChange={this.onNodeTypeSelected}>
              <option disabled value="" key="-1">
                -- select audio node type --
              </option>
              {options}
            </select>
          </Fragment>
        }
        footer={
          <OkButton onClick={this.onSubmit} />
        }
      />
    );
  }
}

export default AddAudioNode;