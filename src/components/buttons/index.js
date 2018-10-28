import React from 'react';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const AddButton = ({ onClick }) => (
  <Button text="+" onClick={onClick}></Button>
);

const OkButton = ({ onClick }) => (
  <Button text="Ok" onClick={onClick}></Button>
);

const EditButton = ({ onClick }) => (
  <Button text="Edit" onClick={onClick}></Button>
);

const DeleteButton = ({ onClick }) => (
  <Button text="-" onClick={onClick}></Button>
);

export default Button;
export { AddButton, OkButton, EditButton, DeleteButton };
