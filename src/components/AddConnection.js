import React, { Component } from 'react';
import { Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import ModalBox from './ModalBox';

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
  }

  onSelectChange(type, event) {
    let tmp = {};
    tmp[type] = event.target.value;
    this.setState(tmp);
  }

  onSubmit() {
    this.props.toggle();
    this.props.onAddConnection(this.state.from, this.state.to);
  }

  render() {
    const { nodesList, isOpen, toggle } = this.props;
    const nodeOptions = nodesList.map(({ nodeId, title }) => (
      <MenuItem key={nodeId} value={nodeId}>{title}</MenuItem>
    ));
    return (
      <ModalBox
        isOpen={isOpen}
        toggle={toggle}
        header="Adding a connection between 2 nodes"
        body={
          <form
            style={{ display: 'flex', flexDirection: 'column', }}
            autoComplete="off"
            onSubmit={this.onSubmit}
          >
            <FormControl
              style={{ minWidth: 150 }}
              margin="normal"
            >
              <InputLabel htmlFor="node-device">From Node</InputLabel>
              <Select
                value={this.state.from}
                onChange={this.onFromChange}
                inputProps={{
                  name: 'from-node',
                  id: 'from-node',
                }}
              >
                <MenuItem value="" disabled key="-1">
                  <em>-- select from node --</em>
                </MenuItem>
                {nodeOptions}
              </Select>
            </FormControl>
            <FormControl
              style={{ minWidth: 150 }}
              margin="normal"
            >
              <InputLabel htmlFor="to-node">To Node</InputLabel>
              <Select
                value={this.state.to}
                onChange={this.onToChange}
                inputProps={{
                  name: 'to-node',
                  id: 'to-node',
                }}
              >
                <MenuItem value="" disabled key="-1">
                  <em>-- select to node --</em>
                </MenuItem>
                {nodeOptions}
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

export default AddConnection;