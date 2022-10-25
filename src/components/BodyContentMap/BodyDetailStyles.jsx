import { createStyles, makeStyles } from '@mui/styles';

export const useBodyDetailStyles = makeStyles(() =>
  createStyles({
    boxBodyDetail: {
      position: 'absolute',
      width: '300px',
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      right: '20px',
      top: '17%',
      zIndex: 999,
      borderRadius: '9px',
    },
    boxBodyTitle: {
      marginLeft: '10px',
    },
    contentBoxBody: {
      marginTop: '10px',
      height: 'auto',
    },
    bottomContentBody: {
      // position: 'absolute',
      // right: '30px',
      // bottom: '10px',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardBodyList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px 0px',
    },
  })
);
