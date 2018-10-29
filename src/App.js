import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {
  AddButton, DeleteButton, OkButton, EditButton
} from './components/buttons';
import Node from './components/Node';
import NodeList from './components/NodeList';
import AddEndpoint from './components/AddEndpoint';
import EditGain from './components/EditGain';

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
    ];
    const addGainNode = () => console.log('adding a gain node');
    const openAddEndpoint = (type) => console.log("opening add endpoint menu for ", type);
    const openAddConnection = () => console.log("opening add connection menu");
    const onGainChange = (nodeId, value) => console.log("setting gain for " + nodeId + " to " + value);
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
            onAdd={openAddEndpoint.bind(null, "input")}
          />
        </div>
        <div>
          <NodeList
            title="Outputs"
            nodes={nodes}
            onDelete={onDelete}
            onAdd={openAddEndpoint.bind(null, "output")}
          />
        </div>
        <div>
          <NodeList
            title="Audio Nodes"
            nodes={nodes}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={addGainNode}
          />
        </div>
        <div>
          <NodeList
            title="Connections"
            nodes={nodes}
            onDelete={onDelete}
            onAdd={openAddConnection}
          />
        </div>
        <div>
          <AddEndpoint
            type="input"
            deviceList={devices}
            onCreate={onCreateEndpoint}
          />
        </div>
        <div>
          <EditGain
            nodeId="2"
            value="0.5"
            onGainChange={onGainChange}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
