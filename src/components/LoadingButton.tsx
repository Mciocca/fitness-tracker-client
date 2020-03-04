import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core';

interface LoadingButtonProps {
  loading: boolean,
  color: 'primary' | 'secondary',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
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

const LoadingButton: React.FC<LoadingButtonProps> =  ({ loading, children, color  }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button type="submit" variant="contained" disabled={loading} color={color}>
        { children }
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </Button>

    </div>
  )
}

export default LoadingButton;
