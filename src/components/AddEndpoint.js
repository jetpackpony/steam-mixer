import React, { Component } from 'react';
import ModalBox from './ModalBox';
import { MODAL_TYPES } from '../store/constants';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

const getDeviceById = (deviceList, deviceId) => (
  deviceList.find(d => d.deviceId === deviceId)
);

const getTitle = (type) =>
  type === MODAL_TYPES.ADD_INPUT
    ? "Add an input node"
    : type === MODAL_TYPES.ADD_OUTPUT
      ? "Add an output node"
      : "";

const getDefaultOption = (type) =>
  type === MODAL_TYPES.ADD_INPUT
    ? "-- select input device --"
    : type === MODAL_TYPES.ADD_OUTPUT
      ? "-- select output device --"
      : "";

                

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

  onSubmit(e) {
    e.preventDefault();
    this.props.toggle();
    this.props.onCreate(
      this.state.title,
      getDeviceById(this.props.deviceList, this.state.deviceId)
    );
  }

  render() {
    const { type, deviceList, isOpen, toggle } = this.props;
    const options = deviceList.map(device => (
      <MenuItem key={device.deviceId} value={device.deviceId}>
        {device.label}
      </MenuItem>
    ));
    return (
      <ModalBox
        isOpen={isOpen}
        toggle={toggle}
        header={getTitle(type)}
        body={
          <form
            style={{ display: 'flex', flexDirection: 'column', }}
            autoComplete="off"
            onSubmit={this.onSubmit}
          >
            <TextField
              id="node-title"
              label="Title"
              value={this.state.title}
              onChange={this.onTitleChanged}
              margin="normal"
              style={{ minWidth: 150 }}
            />
            <FormControl
              style={{ minWidth: 150 }}
              margin="normal"
            >
              <InputLabel htmlFor="node-device">Device</InputLabel>
              <Select
                value={this.state.deviceId}
                onChange={this.onDeviceSelected}
                inputProps={{
                  name: 'node-device',
                  id: 'node-device',
                }}
              >
                <MenuItem value="" disabled key="-1">
                  <em>{getDefaultOption(type)}</em>
                </MenuItem>
                {options}
              </Select>
            </FormControl>
          </form>
        }
        footer={
          <Button color="primary" onClick={this.onSubmit}>Add</Button>
        }
      />
    );
  }
}

export default AddEndpoint;