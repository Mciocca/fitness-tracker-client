import React, { useEffect } from 'react';
import Close from '@material-ui/icons/Close';
import { Snackbar, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { NotificationSeverity } from '../actions/actionTypes';
import { useLocation } from 'react-router-dom';

interface NotificationBar {
  message: string | null,
  severity: NotificationSeverity,
  hideNotification: () => {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.getContrastText(theme.palette.error.main)
    },
    info: {}, //style not needed, uses default. Here to make typescript happy
    // TODO: figure out why success palette is missing from default theme despite being in documentation
    success: {
      backgroundColor: green[500],
      color: "white"
    },
  })
)

const Notification: React.FC<NotificationBar> = ({ message, severity, hideNotification }) => {
  const location = useLocation();
  const classes = useStyles();
  useEffect(() => {
    hideNotification();
  }, [location, hideNotification]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    hideNotification();
  }

  return (
    <Snackbar
      ContentProps={{
        classes: {
          root: classes[severity]
        }
      }}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      onClose={handleClose}
      open={!!message}
      message={message}
      action={
        <IconButton color="inherit" aria-label="close" onClick={handleClose}>
          <Close color="inherit"/>
        </IconButton>
      }/>
  )
};

export default Notification;
