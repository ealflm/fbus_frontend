import { CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { useBodyListStyles } from './BodyListStyles';

export default function BodyListContentMap(props) {
  const { stationList, routeList, setShowDetail, getStationDetail } = props;
  const setDetailStation = (station) => {
    setShowDetail(true);
    getStationDetail(station);
  };
  const styles = useBodyListStyles();
  useEffect(() => {
    console.log(routeList);
    console.log(stationList);
  }, [routeList, stationList]);
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
                  onClick={() => {}}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        component='div'
                        variant='subtitle1'
                      ></Typography>
                      <Typography
                        variant='subtitle2'
                        color='text.secondary'
                        component='div'
                      ></Typography>
                      <Typography variant='body2'></Typography>
                      <Typography variant='body2'></Typography>
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
