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
import { routeService } from '../../services/RouteService';

import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog';
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
  const [refereshData, setRefereshData] = useState(false);
  const { station, route } = checked;
  useEffect(() => {
    if (station) {
      console.log('run');
      getListStation();
    }
  }, [checked, refereshData]);

  // HANLDE FUNTION CALL API
  const getListStation = () => {
    stationService
      .getListStations()
      .then((res) => {
        setStationList(res.data.body);
      })
      .catch((error) => toast.error(error.message));
  };
  const getListRoute = () => {
    routeService
      .getListRoutes()
      .then((res) => {
        setRouteList(res.data.body);
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
    getListRoute();
  };
  const showLayoutListStation = () => {
    setShowDetail(false);
    setRouteList(null);
    getListStation();
  };
  const getStationDetail = (stationDetail) => {
    setRouteDetail(null);
    setStationDetail(stationDetail);
  };
  const getRouteDetail = (routeDetail) => {
    setStationDetail(null);
    setRouteDetail(routeDetail);
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
          routeDetail={routeDetail}
          setStationDetail={setStationDetail}
          setRouteDetail={setRouteDetail}
          setRefereshData={setRefereshData}
          refereshData={refereshData}
        />
      ) : (
        <BodyListContentMap
          setShowDetail={setShowDetail}
          stationList={stationList}
          routeList={routeList}
          // Function form child to parrent
          getStationDetail={getStationDetail}
          getRouteDetail={getRouteDetail}
        />
      )}
      <Mapbox
        stationList={stationList}
        routerList={routeList}
        stationDetail={stationDetail}
        routeDetail={routeDetail}
      />
      <StationManage
        showStationDialog={showStationDialog}
        setShowStationDialog={setShowStationDialog}
        setRefereshData={setRefereshData}
        refereshData={refereshData}
      />
    </div>
  );
};

export default Trips;
