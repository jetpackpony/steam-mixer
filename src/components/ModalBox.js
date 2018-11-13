import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalBox = ({ isOpen, toggle, header, body, footer }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </Modal>
  );
};

export default ModalBox;