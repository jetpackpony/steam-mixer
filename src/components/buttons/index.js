import React from 'react';
import { Button } from '@material-ui/core';

const Btn = ({ onClick, children }) => (
  <Button onClick={onClick}>
    {children}
  </Button>
);

const AddButton = ({ onClick }) => (
  <Btn onClick={onClick}>+</Btn>
);

const OkButton = ({ onClick }) => (
  <Btn onClick={onClick}>Ok</Btn>
);

const EditButton = ({ onClick }) => (
  <Btn onClick={onClick}>Edit</Btn>
);

const DeleteButton = ({ onClick }) => (
  <Btn onClick={onClick}>-</Btn>
);

export { AddButton, OkButton, EditButton, DeleteButton, Btn };
