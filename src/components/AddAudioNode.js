import React, { Component } from 'react';
import ModalBox from './ModalBox';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

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
      <MenuItem key={nodeType.id} value={nodeType.id}>
        {nodeType.title}
      </MenuItem>
    ));
    return (
      <ModalBox
        isOpen={isOpen}
        toggle={toggle}
        header="Add an audio node"
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
              <InputLabel htmlFor="node-type">Node Type</InputLabel>
              <Select
                value={this.state.nodeTypeId}
                onChange={this.onNodeTypeSelected}
                inputProps={{
                  name: 'node-type',
                  id: 'node-type',
                }}
              >
                <MenuItem value="" disabled key="-1">
                  <em>-- select audio node type --</em>
                </MenuItem>
                {options}
              </Select>
            </FormControl>
          </form>
        }
        footer={
          <Button onClick={this.onSubmit}>Add</Button>
        }
      />
    );
  }
}

export default AddAudioNode;