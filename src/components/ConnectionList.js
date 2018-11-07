import React from 'react';
import { AddButton } from './buttons';
import { Card, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import Connection from './Connection';

const ConnectionList = ({ title, nodes, onDelete, onAdd }) => {
  let nodesList = nodes.map(({ nodeId, fromTitle, fromId, toTitle, toId }) => (
    <Connection
      key={nodeId}
      fromTitle={fromTitle}
      fromId={fromId}
      toTitle={toTitle}
      toId={toId}
      nodeId={nodeId}
      onDelete={onDelete}
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

export default ConnectionList;