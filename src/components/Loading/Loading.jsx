import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { loadingStyles } from './LoadingStyles';
import { Box } from '@mui/material';

const Loading = (props) => {
  const classes = loadingStyles();
  const { isLoading } = props;
  if (isLoading) {
    return (
      <Box className={classes.BoxLoading}>
        <CircularProgress disableShrink className={classes.LoadingIcon} />
      </Box>
    );
  }
};
export default Loading;
