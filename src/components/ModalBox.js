import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog } from '@material-ui/core';


const ModalBox = ({
  isOpen,
  toggle,
  header,
  body,
  footer,
  fullScreen,
  maxWidth = "sm"
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={toggle}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={maxWidth}
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

export default withMobileDialog({ breakpoint: 'xs'})(ModalBox);