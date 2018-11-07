import React from 'react';
import { DeleteButton, EditButton } from './buttons';
import { Row, Col } from 'reactstrap';

const Connection = ({ nodeId, fromTitle, fromId, toTitle, toId, onDelete }) => {
  return (
    <Row>
      <Col xs="1">
        <DeleteButton onClick={() => onDelete(fromId, toId)} />
      </Col>
      <Col xs="8">{fromTitle} -> {toTitle}</Col>
    </Row>
  );
};

export default Connection;