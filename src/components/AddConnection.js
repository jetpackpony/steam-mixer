import React, { Component } from 'react';
import { OkButton } from './buttons';

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
  }

  onSelectChange(type, event) {
    let tmp = {};
    tmp[type] = getNodeById(this.props.nodesList, event.target.value);
    this.setState(tmp);
  }

  onSubmit() {
    this.props.onAddConnection(this.state);
  }

  render() {
    const onFromChange = this.onSelectChange.bind(this, "from");
    const onToChange = this.onSelectChange.bind(this, "to");
    const onSubmit = this.onSubmit.bind(this);
    const nodeOptions = this.props.nodesList.map(({ nodeId, title }) => (
      <option key={nodeId} value={nodeId}>{nodeId} {title}</option>
    ));
    return (
      <div>
        <div>
          <label>From:</label>
          <select value={this.state.from.nodeId} onChange={onFromChange}>
            <option value="">-- select from node --</option>
            {nodeOptions}
          </select>
        </div>
        <div>
          <label>To:</label>
          <select value={this.state.to.nodeId} onChange={onToChange}>
            <option value="">-- select to node --</option>
            {nodeOptions}
          </select>
        </div>
        <div>
          <OkButton onClick={onSubmit} />
        </div>
      </div>
    );
  }

}

export default AddConnection;