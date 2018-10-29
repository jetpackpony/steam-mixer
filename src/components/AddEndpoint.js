import React, { Component } from 'react';
import { OkButton } from './buttons';

const getDeviceById = (deviceList, deviceId) => (
  deviceList.find(d => d.deviceId === deviceId)
);

class AddEndpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deviceId: ""
    }
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
    this.props.onCreate({
      type: this.props.type,
      title: this.state.title,
      device: getDeviceById(this.props.deviceList, this.state.deviceId)
    });
  }

  render() {
    const { type, deviceList } = this.props;
    const onDeviceSelected = this.onDeviceSelected.bind(this);
    const onTitleChanged = this.onTitleChanged.bind(this);
    const onSubmit = this.onSubmit.bind(this);
    let options = deviceList.map(device => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ));
    return (
      <div>
        <input value={this.state.title} onChange={onTitleChanged} />
        <select value={this.state.deviceId} onChange={onDeviceSelected}>
          <option disabled value="" key="-1">
            -- select {type === "input" ? "input" : "output"} device --
          </option>
          {options}
        </select>
        <OkButton onClick={onSubmit} />
      </div>
    );
  }
}

export default AddEndpoint;