import React, { Component, Fragment } from 'react';
import { OkButton } from './buttons';
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
    this.toggle = this.toggle.bind(this);
  }

  onSelectChange(type, event) {
    let tmp = {};
    tmp[type] = event.target.value;
    this.setState(tmp);
  }

  onSubmit() {
    this.toggle();
    this.props.onAddConnection(this.state.from, this.state.to);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const nodeOptions = this.props.nodesList.map(({ nodeId, title }) => (
      <option key={nodeId} value={nodeId}>{title}</option>
    ));
    return (
      <ModalBox
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        header="Adding a connection between 2 nodes"
        body={
          <Fragment>
            <div>
              <label>From:</label>
              <select value={this.state.from} onChange={this.onFromChange}>
                <option value="">-- select from node --</option>
                {nodeOptions}
              </select>
            </div>
            <div>
              <label>To:</label>
              <select value={this.state.to} onChange={this.onToChange}>
                <option value="">-- select to node --</option>
                {nodeOptions}
              </select>
            </div>
          </Fragment>
        }
        footer={
          <OkButton onClick={this.onSubmit} />
        }
      />
    );
  }

}

export default AddConnection;