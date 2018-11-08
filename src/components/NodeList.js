import React from 'react';
import Node from './Node';
import { AddButton } from './buttons';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';

const NodeList = ({ title, nodes, onDelete, onEdit, onAdd }) => {
  let nodesList = nodes.map(({ title, nodeId }) => (
    <Node
      key={nodeId}
      title={title}
      nodeId={nodeId}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ));
  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <Container>
          {nodesList}
          <Row>
            <Col>
              <AddButton onClick={onAdd} />
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  )
};

export default NodeList;