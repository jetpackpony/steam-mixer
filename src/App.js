import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {
  AddButton, DeleteButton, OkButton, EditButton
} from './components/buttons';
import Node from './components/Node';

class App extends Component {
  render() {
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
            onDelete={(nodeId) => console.log("deleting node " + nodeId)}
            onEdit={(nodeId) => console.log("editing node " + nodeId)}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
