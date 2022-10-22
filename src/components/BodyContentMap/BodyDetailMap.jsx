import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useBodyDetailStyles } from './BodyDetailStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

export default function BodyDetailMap(props) {
  const { setShowDetail } = props;
  const styles = useBodyDetailStyles();
  return (
    <div className={styles.boxBodyDetail}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Chi tiết trạm</h4>
        <Box className={styles.cardBodyList}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h6'>
                Live From Space
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Mac Miller
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Mac Miller
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </div>
      <div className={styles.bottomContentBody}>
        <IconButton
          onClick={() => {
            setShowDetail(true);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <IconButton>
          <SaveIcon />
        </IconButton> */}
      </div>
    </div>
  );
}
