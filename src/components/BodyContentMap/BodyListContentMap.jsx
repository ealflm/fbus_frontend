import { CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { useBodyListStyles } from './BodyListStyles';

export default function BodyListContentMap(props) {
  const {
    stationList,
    routeList,
    setShowDetail,
    getStationDetail,
    getRouteDetail,
  } = props;
  const styles = useBodyListStyles();

  useEffect(() => {
    // console.log(routeList);
    // console.log(stationList);
  }, [routeList, stationList]);
  const setDetailStation = (station) => {
    setShowDetail(true);
    getStationDetail(station);
  };
  const setDetailRoute = (route) => {
    setShowDetail(true);
    getRouteDetail(route);
  };
  return stationList ? (
    <div className={styles.boxBodyList}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Danh sách trạm </h4>
        <ScrollPanel
          style={{ width: '100%', height: '100%' }}
          className={styles.scrollBodyContent}
        >
          <Box className={styles.cardBodyList}>
            {stationList?.map((item, index) => {
              return (
                <Card
                  key={index}
                  variant='outlined'
                  sx={{ display: 'flex' }}
                  onClick={() => {
                    setDetailStation(item);
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component='div' variant='subtitle1'>
                        {item.name}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        color='text.secondary'
                        component='div'
                      >
                        Địa chỉ: {item.address}
                      </Typography>
                      <Typography variant='body2'>
                        Kinh độ: {item.longitude}
                      </Typography>
                      <Typography variant='body2'>
                        Vĩ độ: {item.latitude}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </ScrollPanel>
      </div>
      <div className={styles.bottomContentBody}></div>
    </div>
  ) : routeList ? (
    <div className={styles.boxBodyList}>
      <div className={styles.contentBoxBody}>
        <h4 className={styles.boxBodyTitle}>Danh sách Tuyến </h4>
        <ScrollPanel
          style={{ width: '100%', height: '100%' }}
          className={styles.scrollBodyContent}
        >
          <Box className={styles.cardBodyList}>
            {routeList?.map((item, index) => {
              return (
                <Card
                  key={index}
                  variant='outlined'
                  sx={{ display: 'flex' }}
                  onClick={() => {
                    setDetailRoute(item);
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component='div' variant='subtitle1'>
                        {item.name}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        color='text.secondary'
                        component='div'
                      >
                        Khoảng cách: {item.distance}
                      </Typography>
                      <Typography variant='body2'>
                        Số lượng trạm: {item.totalStation}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </ScrollPanel>
      </div>
      <div className={styles.bottomContentBody}></div>
    </div>
  ) : null;
}
