import React from 'react';

const EditGain = ({ nodeId, value, onGainChange }) => {
  let onChange = (event) => onGainChange(nodeId, event.target.value);
  return (
    <div>
      <div>
        Gain
        <input
          type="number"
          min="0" max="1.5" step="0.01"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EditGain;