import { createStyles, makeStyles } from '@mui/styles';

export const useTripStyles = makeStyles(() =>
  createStyles({
    tripWrap: {
      position: 'relative',
    },
    boxHeader: {
      position: 'absolute',
      height: '100px',
      width: '300px',
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      right: '20px',
      top: '20px',
      zIndex: 999,
      borderRadius: '9px',
    },
    boxBodyList: {
      position: 'absolute',
      height: '75vh',
      width: '300px',
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      right: '20px',
      bottom: '20px',
      zIndex: 999,
      borderRadius: '9px',
    },
    boxBodyTitle: {
      marginLeft: '10px',
    },
    contentBoxBody: {
      marginTop: '10px',
      // backgroundColor: 'red',
      height: '92%',
      maxHeight: '92%',
    },
  })
);
