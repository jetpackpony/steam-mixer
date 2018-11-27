import React from 'react';
import styles from './ContextMenu.module.scss';

const ContextMenu = ({ coords, actions, isOpen, toggle }) => {
  return (
    <div
      className={styles.menu}
      style={{
        left: coords.x,
        top: coords.y,
        display: (isOpen) ? "block" : "none"
      }}
      onBlur={toggle}
    >
      {
        actions.map(({ title, onClick }) => (
          <button
            key={title}
            className={styles.item}
            type="button"
            onClick={onClick}
          >
            {title}
          </button>
        ))
      }
    </div>
  );
};

export default ContextMenu;