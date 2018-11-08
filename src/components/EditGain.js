import React, { Fragment } from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

const EditGain = ({ nodeId, value, onGainChange, isOpen, toggle }) => {
  let onChange = (event) => onGainChange(nodeId, event.target.value);
  return (
    <ModalBox
      isOpen={isOpen}
      toggle={toggle}
      header="Edit Gain"
      body={
        <input
          type="number"
          min="0" max="1.5" step="0.01"
          value={value}
          onChange={onChange}
        />
      }
      footer={
        <OkButton onClick={toggle} />
      }
    />
  );
};

export default EditGain;