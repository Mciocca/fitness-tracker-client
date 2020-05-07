import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import { Link } from 'react-router-dom';
interface SideDrawerProps {
  open: boolean;
  toggleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 200,
    },
    link: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
  })
);

const SideDrawer: React.FC<SideDrawerProps> = ({ open, toggleClose }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.list}
      open={open}
      onClose={toggleClose}
      anchor="left"
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleClose}
        onKeyPress={toggleClose}
      >
        <List>
          <Link className={classes.link} to="/dashboard/goals">
            <ListItem button>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary={'Goals'} />
            </ListItem>
          </Link>
          <Link className={classes.link} to="/dashboard/workouts/new">
            <ListItem button>
              <ListItemIcon>
                <FitnessCenter />
              </ListItemIcon>
              <ListItemText primary={'New Workout'} />
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
