import * as R from 'ramda';
import React, { Fragment } from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

const buildAudioNodePropsForm = (fields, values, onChange) => {
  return (
    <Fragment>
      {
        R.map((field) => (
          <div key={field.id}>
            <label>{field.title}</label>
            <input
              id={field.id}
              onChange={onChange}
              value={values[field.id]}
              {...field.fieldProps}
            />
          </div>
        ), fields)
      }
    </Fragment>
  );
};

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
  const body = buildAudioNodePropsForm(fields, values, onChange);
  return (
    <ModalBox
      isOpen={isOpen}
      toggle={boundToggle}
      header="Edit Audio Node"
      body={body}
      footer={
        <OkButton onClick={boundToggle} />
      }
    />
  );
};

export default EditAudioNode;