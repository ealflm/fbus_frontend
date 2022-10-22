import { createStyles, makeStyles } from '@mui/styles';

export const useBodyListStyles = makeStyles(() =>
  createStyles({
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
    scrollBodyContent: {
      marginLeft: '10px',
      marginTop: '10px',
    },
    bottomContentBody: {
      position: 'absolute',
      right: '30px',
      bottom: '10px',
    },
    cardBodyList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px 0px',
    },
  })
);
