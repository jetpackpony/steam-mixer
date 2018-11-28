import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const ModalBox = ({ isOpen, toggle, header, body, footer }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{header}</DialogTitle>
      <DialogContent>
        {body}
      </DialogContent>
      <DialogActions>
        {footer}
      </DialogActions>
    </Dialog>
  );
};

export default ModalBox;