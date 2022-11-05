import { createStyles, makeStyles } from '@mui/styles';

export const textFieldSyles = makeStyles(() =>
  createStyles({
    disabled: {
      // background: "#F2F2F2!important",
      opacity: 1,
      color: 'rgba(0, 0, 0, 0.38)',
    },
    label: {
      color: '#2C2C2C !important',
      fontSize: 13,
      fontWeight: 400,
    },
    inputRoot: {
      background: '#ffffff !important',
      border: '1px solid #e0e0e0',
      borderRadius: '5px !important',

      '& input:disabled': {
        background: '#e4e4e4 !important',
        borderRadius: 3,
      },
      '& .MuiFilledInput-root:before , .MuiFilledInput-root:after': {
        display: 'none !important',
        borderBottomStyle: 'hidden',
      },
      '&:before, &:after': {
        borderBottom: 'none !important',
      },
      // '&:hover': {
      //   border: `1px solid #0287FF`,
      // },
    },
    inputRootError: {
      background: '#ffffff!important',
      // border: '1px solid red',
      // borderRadius: '5px !important',

      '& input:disabled': {
        background: '#e4e4e4!important',
        borderRadius: 3,
      },
      '& .MuiFilledInput-root:before , .MuiFilledInput-root:after': {
        display: 'none !important',
        borderBottomStyle: 'hidden',
      },
      '&:before, &:after': {
        borderBottom: 'none !important',
      },
    },
    focusedLabel: {
      color: '#2C2C2C !important',
      opacity: 1,
      fontSize: 13,
      fontWeight: 400,
    },

    removeUnderline: {
      '& .MuiFilledInput-root:before': {
        display: 'none !important',
      },
      '& .MuiFilledInput-root:after': {
        display: 'none !important',
      },
      '& .MuiFilledInput-root': {
        background: '#efefef !important',
      },
    },
    textArea: {
      '& .MuiFilledInput-root.MuiFilledInput-underline.Mui-disabled': {
        background: '#e4e4e4 !important',
      },
    },
  })
);
