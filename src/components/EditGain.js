import React from 'react';
import { OkButton } from './buttons';
import ModalBox from './ModalBox';

const EditGain = ({ nodeId, value, onGainChange, isOpen, toggle }) => {
  const onChange = (event) => onGainChange(nodeId, event.target.value);
  const boundToggle = toggle.bind(null, nodeId);
  return (
    <ModalBox
      isOpen={isOpen}
      toggle={boundToggle}
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
        <OkButton onClick={boundToggle} />
      }
    />
  );
};

export default EditGain;