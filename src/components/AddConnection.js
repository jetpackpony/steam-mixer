import React, { Component } from 'react';
import { OkButton } from './buttons';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const getNodeById = (nodeList, nodeId) => (
  nodeList.find(n => n.nodeId === nodeId)
);

class AddConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: ""
    };
    this.onFromChange = this.onSelectChange.bind(this, "from");
    this.onToChange = this.onSelectChange.bind(this, "to");
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onSelectChange(type, event) {
    let tmp = {};
    tmp[type] = getNodeById(this.props.nodesList, event.target.value);
    this.setState(tmp);
  }

  onSubmit() {
    this.toggle();
    this.props.onAddConnection(this.state);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const nodeOptions = this.props.nodesList.map(({ nodeId, title }) => (
      <option key={nodeId} value={nodeId}>{nodeId} {title}</option>
    ));
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Adding a connection between 2 nodes</ModalHeader>
        <ModalBody>
          <div>
            <label>From:</label>
            <select value={this.state.from.nodeId} onChange={this.onFromChange}>
              <option value="">-- select from node --</option>
              {nodeOptions}
            </select>
          </div>
          <div>
            <label>To:</label>
            <select value={this.state.to.nodeId} onChange={this.onToChange}>
              <option value="">-- select to node --</option>
              {nodeOptions}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
            <OkButton onClick={this.onSubmit} />
        </ModalFooter>
      </Modal>
    );
  }

}

export default AddConnection;