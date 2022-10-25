import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useBodyDetailStyles } from './BodyDetailStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
export default function BodyDetailMap(props) {
  const {
    setShowDetail,
    stationDetail,
    routeDetail,
    setStationDetail,
    setRouteDetail,
  } = props;
  const styles = useBodyDetailStyles();
  useEffect(() => {
    if (routeDetail) {
      console.log(routeDetail);
    } else if (stationDetail) {
      console.log(stationDetail);
    }
  }, [setShowDetail, stationDetail, routeDetail]);

  const backStationList = () => {
    setShowDetail(false);
    setStationDetail(null);
  };
  const backRouteList = () => {
    setShowDetail(false);
    setRouteDetail(null);
  };
  return setShowDetail && stationDetail ? (
    <div className={styles.boxBodyDetail}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Chi tiết trạm</h4>
        <Box className={styles.cardBodyList}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h6'>
                {stationDetail.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Địa chỉ: {stationDetail.address}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Kinh độ: {stationDetail.longitude}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Vĩ độ: {stationDetail.latitude}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </div>
      <div className={styles.bottomContentBody}>
        <IconButton
          onClick={() => {
            backStationList();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
          {/* <Button variant='text'>Cập nhật</Button> */}
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  ) : setShowDetail && routeDetail ? (
    <div className={styles.boxBodyDetail}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Chi tiết Tuyến</h4>
        <Box className={styles.cardBodyList}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h6'>
                {routeDetail.name}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Khoảng cách: {routeDetail.distance}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                Số trạm: {routeDetail.totalStation}
              </Typography>
              {routeDetail.stationList.map((item, index) => {
                return (
                  <Box
                    key={index}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      component='div'
                    >
                      Tên trạm:
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      component='div'
                      mt={3}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Box>
        </Box>
      </div>
      <div className={styles.bottomContentBody}>
        <IconButton
          onClick={() => {
            backRouteList();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        {/* <IconButton>
          <SaveIcon />
        </IconButton> */}
      </div>
    </div>
  ) : null;
}
