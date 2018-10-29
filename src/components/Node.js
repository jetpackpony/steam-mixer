import React from 'react';
import { DeleteButton, EditButton } from './buttons';
import { Row, Col } from 'reactstrap';

const Node = ({ title, nodeId, onDelete, onEdit }) => {
  let edit =
    typeof onEdit === "function"
      ? <EditButton onClick={() => onEdit(nodeId)} />
      : null;

  return (
    <Row>
      <Col xs="1">
        <DeleteButton onClick={() => onDelete(nodeId)} />
      </Col>
      <Col xs="2">{nodeId}</Col>
      <Col xs="6">{title}</Col>
      {edit ? <Col xs="1">{edit}</Col> : null}
    </Row>
  );
};

export default Node;