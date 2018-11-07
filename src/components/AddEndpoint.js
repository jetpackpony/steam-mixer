import React, { Component } from 'react';
import { OkButton } from './buttons';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const getDeviceById = (deviceList, deviceId) => (
  deviceList.find(d => d.deviceId === deviceId)
);

const getTitle = (type) => 
  type === "input"
    ? "Add an input node"
    : "Add an output node";

class AddEndpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deviceId: ""
    };

    this.onDeviceSelected = this.onDeviceSelected.bind(this);
    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onDeviceSelected(event) {
    let deviceId = event.target.value;
    let device = getDeviceById(this.props.deviceList, deviceId);
    this.setState({
      deviceId,
      title: device.label
    });
  }

  onTitleChanged(event) {
    this.setState({ title: event.target.value });
  }

  onSubmit() {
    this.toggle();
    this.props.onCreate(
      this.state.title,
      getDeviceById(this.props.deviceList, this.state.deviceId)
    );
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const { type, deviceList } = this.props;
    let options = deviceList.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ));
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{getTitle(type)}</ModalHeader>
        <ModalBody>
          <input value={this.state.title} onChange={this.onTitleChanged} />
          <select value={this.state.deviceId} onChange={this.onDeviceSelected}>
            <option disabled value="" key="-1">
              -- select {type === "input" ? "input" : "output"} device --
          </option>
            {options}
          </select>
        </ModalBody>
        <ModalFooter>
          <OkButton onClick={this.onSubmit} />
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddEndpoint;