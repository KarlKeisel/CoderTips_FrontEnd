import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Expects state (true or false), setState function, title text, body text, button text
// Used for quick status updates that have no choices

export default function AlertDialog(props) {

  return (
      <Dialog
        open={props.modal.open}
        onClose={props.modal.handleClose}
      >
        <DialogTitle id="alert-dialog-title">{props.modal.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.modal.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href={props.modal.redirect} color="primary" autoFocus>
            {props.modal.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}