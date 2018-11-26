import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({
  addInput, addAudioNode,
  addOutput, addConnection
}) => (
  <div>
    <MenuItem title="Add input" onClick={addInput}/>
    <MenuItem title="Add audio node" onClick={addAudioNode}/>
    <MenuItem title="Add output" onClick={addOutput}/>
    <MenuItem title="Add connection" onClick={addConnection}/>
  </div>
);

export default Menu;