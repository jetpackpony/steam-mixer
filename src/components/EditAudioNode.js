import * as R from 'ramda';
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import ModalBox from './ModalBox';

const buildAudioNodePropsForm = (fields, values, onChange) => (
  R.map((field) => (
    <TextField
      key={field.id}
      id={field.id}
      onChange={onChange}
      label={field.title}
      value={values[field.id]}
      type={field.fieldProps.type}
      inputProps={field.fieldProps}
      margin="normal"
      style={{ minWidth: 150 }}
    />
  ), fields)
);

const EditAudioNode = ({
  nodeId, isOpen, toggle,
  onAudioNodePropsChange,
  fields, values
}) => {
  const onChange = (event) => {
    onAudioNodePropsChange(nodeId, {
      ...values,
      [event.target.id]: event.target.value
    });
  }
  const boundToggle = toggle.bind(null, nodeId);
  const filedsHTML = buildAudioNodePropsForm(fields, values, onChange);
  return (
    <ModalBox
      isOpen={isOpen}
      toggle={boundToggle}
      header="Edit Audio Node"
      body={
        <form
          style={{ display: 'flex', flexDirection: 'column', }}
          autoComplete="off"
          onSubmit={boundToggle}
        >
          {filedsHTML}
        </form>
      }
      footer={
        <Button onClick={boundToggle}>Done</Button>
      }
    />
  );
};

export default EditAudioNode;