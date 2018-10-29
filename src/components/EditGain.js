import React from 'react';
import { OkButton } from './buttons';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const EditGain = ({ nodeId, value, onGainChange, isOpen, toggle }) => {
  let onChange = (event) => onGainChange(nodeId, event.target.value);
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Gain</ModalHeader>
      <ModalBody>
        <input
          type="number"
          min="0" max="1.5" step="0.01"
          value={value}
          onChange={onChange}
        />
      </ModalBody>
      <ModalFooter>
        <OkButton onClick={toggle} />
      </ModalFooter>
    </Modal>
  );
};

export default EditGain;