import { createStyles, makeStyles } from '@mui/styles';
export const loadingStyles = makeStyles(() =>
  createStyles({
    BoxLoading: {
      position: 'fixed',
      zIndex: '9999',
      height: '100%',
      width: '100%',
      overflow: 'show',
      margin: 'auto',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    LoadingIcon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
  })
);
