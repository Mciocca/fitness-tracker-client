import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core';

interface LoadingButtonProps {
  showLoading: boolean,
  color: 'primary' | 'secondary',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      textAlign: 'center'
    },
    buttonProgress: {
      color: 'red',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const LoadingButton: React.FC<LoadingButtonProps> =  ({ showLoading, children, color  }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button type="submit" variant="contained" disabled={showLoading} color={color}>
        { children }
      </Button>
      {showLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

export default LoadingButton;
