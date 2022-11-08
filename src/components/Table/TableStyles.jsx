import { createStyles, makeStyles } from '@mui/styles';

export const tableStyles = makeStyles(() =>
  createStyles({
    rowPerPage: {
      margin: '0 20px',
    },
    selectRowPerPage: {
      height: '2rem',
      width: '4.5rem',
    },
  })
);
