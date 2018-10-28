import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {
  AddButton, DeleteButton, OkButton, EditButton
} from './components/buttons';
import Node from './components/Node';
import NodeList from './components/NodeList';

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
          <NodeList nodes={nodes} onDelete={onDelete} onEdit={onEdit} />
        </div>
      </Fragment>
    );
  }
}

export default App;
