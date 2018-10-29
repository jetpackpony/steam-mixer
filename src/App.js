import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {
  AddButton, DeleteButton, OkButton, EditButton
} from './components/buttons';
import Node from './components/Node';
import NodeList from './components/NodeList';
import AddEndpoint from './components/AddEndpoint';

class App extends Component {
  render() {
    let nodes = [
      { title: "First", nodeId: "I1"},
      { title: "Second", nodeId: "O1"},
      { title: "Third", nodeId: "C2"},
      { title: "Fourth", nodeId: "O2"},
    ];
    let onDelete = (nodeId) => console.log("deleting node " + nodeId);
    let onEdit = (nodeId) => console.log("editing node " + nodeId);
    const onCreateEndpoint = (device) => console.log("creating device: ", device);
    let devices = [
      { deviceId: "1", label: "Microphone (built-in)"},
      { deviceId: "2", label: "Microphone (external)"},
      { deviceId: "3", label: "Soundflower (2ch)"},
      { deviceId: "4", label: "Soundflower (64ch)"},
    ];
    return (
      <Fragment>
        <div>
          <Button text="Test" onClick={() => console.log("click")} />
          <AddButton onClick={() => console.log("click add button")} />
          <DeleteButton onClick={() => console.log("click delete button")} />
          <OkButton onClick={() => console.log("click ok button")} />
          <EditButton onClick={() => console.log("click edit button")} />
        </div>
        <div>
          <Node
            title="Test Node"
            nodeId="I1"
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
        <div>
          <NodeList
            title="Inputs"
            nodes={nodes}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
        <div>
          <AddEndpoint
            type="input"
            deviceList={devices}
            onCreate={onCreateEndpoint}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
