import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function CustomAlertError(props) {
  const { title, message } = props;
  return (
    <Stack
      sx={{ position: 'absolute', width: '22%', right: '20px', top: '20px' }}
      spacing={2}
    >
      <Alert severity='error'>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}
