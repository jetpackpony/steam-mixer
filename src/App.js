import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Button, {
  AddButton, DeleteButton, OkButton, EditButton
} from './components/buttons';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Button text="Test" onClick={() => console.log("click")} />
        <AddButton onClick={() => console.log("click add button")} />
        <DeleteButton onClick={() => console.log("click delete button")} />
        <OkButton onClick={() => console.log("click ok button")} />
        <EditButton onClick={() => console.log("click edit button")} />
      </Fragment>
    );
  }
}

export default App;
