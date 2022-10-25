import React, { useEffect, useState } from 'react';
import Mapbox from '../../components/Mapbox/Mapbox';
import { useTripStyles } from './TripStyles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, FormControl, Icon, IconButton } from '@mui/material';

import BodyListContentMap from '../../components/BodyContentMap/BodyListContentMap';
import BodyDetailMap from '../../components/BodyContentMap/BodyDetailMap';
import StationManage from './StationManage/StationManage';
import { stationService } from '../../services/StationService';
import { toast } from 'react-toastify';
const Trips = () => {
  const styles = useTripStyles();
  //
  const [showDetail, setShowDetail] = useState(false);
  const [stationDetail, setStationDetail] = useState();
  const [routeDetail, setRouteDetail] = useState();
  const [stationList, setStationList] = useState();
  const [routeList, setRouteList] = useState();
  const [checked, setChecked] = useState({
    station: true,
  });
  const [showStationDialog, setShowStationDialog] = useState(false);
  const { station, route } = checked;
  useEffect(() => {
    if (station) {
      getListStation();
    }
  }, [checked]);

  // HANLDE FUNTION CALL API
  const getListStation = () => {
    stationService
      .getListStations()
      .then((res) => {
        setStationList(res.data.body);
      })
      .catch((error) => toast.error(error.message));
  };
  // HANLDE FUNTIONC LOGIC LAYOUT
  const handleChangeCheckBox = (event) => {
    // setChecked({
    //   ...checked,
    //   [event.target.name]: event.target.checked,
    // });
  };
  const showCreateStation = () => {
    setShowStationDialog(true);
  };
  const showLayoutListRoute = () => {
    setShowDetail(false);
    setStationList(null);
    stationService
      .getListStations()
      .then((res) => {
        setRouteList(res.data.body);
      })
      .catch((error) => toast.error(error.message));
  };
  const showLayoutListStation = () => {
    setRouteList(null);
    setShowDetail(false);
    getListStation();
  };
  const getStationDetail = (stationDetail) => {
    setStationDetail(stationDetail);
  };
  return (
    <div className={styles.tripWrap}>
      <div className={styles.boxHeader}>
        <Box pl={2} pt={1.5}>
          <FormControl component='fieldset' variant='standard'>
            <FormGroup>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name='station'
                      checked={station}
                      onChange={handleChangeCheckBox}
                    />
                  }
                />
                <Button variant='text' onClick={() => showLayoutListStation()}>
                  Trạm xe buýt
                </Button>
                <IconButton onClick={showCreateStation}>
                  <Icon color='primary'>add_circle</Icon>
                </IconButton>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                <Button variant='text' onClick={() => showLayoutListRoute()}>
                  Tuyến xe buýt
                </Button>
                <IconButton>
                  <Icon color='primary'>add_circle</Icon>
                </IconButton>
              </div>
            </FormGroup>
          </FormControl>
        </Box>
      </div>
      {showDetail ? (
        <BodyDetailMap
          setShowDetail={setShowDetail}
          stationDetail={stationDetail}
          setStationDetail={setStationDetail}
          setRouteDetail={setRouteDetail}
        />
      ) : (
        <BodyListContentMap
          setShowDetail={setShowDetail}
          stationList={stationList}
          routeList={routeList}
          getStationDetail={getStationDetail}
        />
      )}
      <Mapbox
        stationList={stationList}
        routerList={routeList}
        stationDetail={stationDetail}
      />
      <StationManage
        showStationDialog={showStationDialog}
        setShowStationDialog={setShowStationDialog}
      />
    </div>
  );
};

export default Trips;
