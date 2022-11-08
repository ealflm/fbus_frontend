import { createStyles, makeStyles } from '@mui/styles';

export const useCustomerStyles = makeStyles(() =>
  createStyles({
    avatarCircle: {
      width: '100px',
      height: '100px',
      margin: '0 auto',
    },
  })
);
