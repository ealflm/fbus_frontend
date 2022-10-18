import { createStyles, makeStyles } from '@mui/styles';

export const useDriverFormStyles = makeStyles(() =>
  createStyles({
    avatarCircle: {
      width: '100px',
      height: '100px',
      margin: '0 auto',
    },
    imageUpload: {
      position: 'relative',
    },
    iconUpload: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
  })
);
