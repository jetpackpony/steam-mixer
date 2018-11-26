import React from 'react';

const ContextMenu = ({ coords, actions, isOpen, toggle }) => {
  return (
    <div
      style={{
        ...menuStyle,
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
            type="button"
            style={itemStyle}
            onClick={onClick}
          >
            {title}
          </button>
        ))
      }
    </div>
  );
};

const menuStyle = {
  display: "block",
  position: "absolute",
  top: "100 %",
  left: "0",
  zIndex: "1000",
  minWidth: "10rem",
  padding: "0.5rem 0",
  margin: "0.125rem 0 0",
  color: "#fff",
  textAlign: "left",
  backgroundColor: "#222",
  backgroundClip: "padding-box",
  border: "1px solid #444",
  borderRadius: "0.25rem"
};

const itemStyle = {
  display: "block",
  width: "100%",
  padding: ".25rem 1.5rem",
  textAlign: "inherit",
  backgroundColor: "transparent",
  border: "0",
  color: "#d9d7d3",
  cursor: "pointer"
};

export default ContextMenu;