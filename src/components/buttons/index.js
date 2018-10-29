import React from 'react';
import { Button } from 'reactstrap';

const AddButton = ({ onClick }) => (
  <Button onClick={onClick}>+</Button>
);

const OkButton = ({ onClick }) => (
  <Button onClick={onClick}>Ok</Button>
);

const EditButton = ({ onClick }) => (
  <Button onClick={onClick}>Edit</Button>
);

const DeleteButton = ({ onClick }) => (
  <Button onClick={onClick}>-</Button>
);

export default Button;
export { AddButton, OkButton, EditButton, DeleteButton };
