import React, { useEffect, useState } from "react";
import Mapbox from "../../components/Mapbox/Mapbox";
import { useTripStyles } from "./TripStyles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, FormControl, Icon, IconButton } from "@mui/material";

import BodyListContentMap from "../../components/BodyContentMap/BodyListContentMap";
import BodyDetailMap from "../../components/BodyContentMap/BodyDetailMap";
import StationManage from "./StationManage/StationManage";
import { stationService } from "../../services/StationService";
import { routeService } from "../../services/RouteService";

import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
const Trips = () => {
  const styles = useTripStyles();
  const navigate = useNavigate();
  //
  const [loading, setLoading] = useState(false);
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
  const [routeLine, setRouteLine] = useState();
  const { station, route } = checked;
  useEffect(() => {
    if (station) {
      getListStation();
    }
  }, [checked, refereshData]);

  // HANLDE FUNTION CALL API
  const getListStation = () => {
    setLoading(true);
    stationService
      .getListStations()
      .then((res) => {
        setStationList(res.data.body);
        setLoading(false);
      })

      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  const getListRoute = () => {
    setLoading(true);
    routeService
      .getListRoutes()
      .then((res) => {
        setRouteList(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
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
    let corrdinators = [];
    routeDetail.stationList.forEach((element) => {
      const lnglat = element.longitude + "," + element.latitude;
      corrdinators = [...corrdinators, lnglat];
    });
    const corrdinatorResult = corrdinators.join(";");
    setLoading(true);
    routeService
      .mapBoxRenderRoute(corrdinatorResult)
      .then((res) => {
        if (res.data) {
          setRouteLine(res.data);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  return (
    <>
      <Loading isLoading={loading}></Loading>
      <div className={styles.tripWrap}>
        <div className={styles.boxHeader}>
          <Box pl={2} pt={1.5}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="station"
                        checked={station}
                        onChange={handleChangeCheckBox}
                      />
                    }
                  />
                  <Button
                    variant="text"
                    onClick={() => showLayoutListStation()}
                  >
                    Trạm xe buýt
                  </Button>
                  <IconButton onClick={showCreateStation}>
                    <Icon color="primary">add_circle</Icon>
                  </IconButton>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button variant="text" onClick={() => showLayoutListRoute()}>
                    Tuyến xe buýt
                  </Button>
                  <IconButton>
                    <Icon
                      color="primary"
                      onClick={() => {
                        navigate("/maps/create-route");
                      }}
                    >
                      add_circle
                    </Icon>
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
            setRouteLine={setRouteLine}
            showLayoutListRoute={showLayoutListRoute}
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
          refereshData={refereshData}
          routeLine={routeLine}
        />
        <StationManage
          showStationDialog={showStationDialog}
          setShowStationDialog={setShowStationDialog}
          setRefereshData={setRefereshData}
          refereshData={refereshData}
        />
      </div>
    </>
  );
};

export default Trips;
