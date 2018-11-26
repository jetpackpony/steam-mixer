import React from 'react';
import { AddButton } from './buttons';

const MenuItem = ({ title, onClick }) => (
  <div>
    <AddButton onClick={onClick} /> {title}
  </div>
);

export default MenuItem;