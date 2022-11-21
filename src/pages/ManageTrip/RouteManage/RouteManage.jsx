import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ScrollPanel } from "primereact/scrollpanel";
import { stationService } from "../../../services/StationService";
import Map from "./Map";
import Loading from "../../../components/Loading/Loading";
import InputTextField from "../../../components/Input/InputTextFiled";
import { useFieldArray, useForm } from "react-hook-form";
import { routeService } from "../../../services/RouteService";
import { toast, ToastContainer } from "react-toastify";
import { isEmpty } from "lodash";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL_DEVELOPMENT,
  MAPBOX_STYLE_URL_PRODUCTION,
} from "../../../configs/baseURL";
import { useRef } from "react";
export default function RouteManage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      stationList: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "stationList", // unique name for your Field Array
    }
  );
  //
  const [loading, setLoading] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [coordinatorFlyTo] = useState();
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);
  const [listStationSelected, setListStationSelected] = useState();
  const [routeLine, setRouteLine] = useState();
  const mapContainerRef = useRef(null); //MapBox Container
  const [lng, setLng] = useState(106.809862); //Longitude
  const [lat, setLat] = useState(10.841128); //Latitude
  const [zoom, setZoom] = useState(14); //Zoom Level
  const [map, setMap] = useState();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        process.env.NODE_ENV === "development"
          ? MAPBOX_STYLE_URL_DEVELOPMENT
          : MAPBOX_STYLE_URL_PRODUCTION,
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map);
  }, []);
  useEffect(() => {
    getListStation();
  }, []);

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
      });
  };

  const getStationSelected = (stationListSelected) => {
    const result = stationListSelected.map((stationSelected, index) => {
      return stationList.find(
        (station) => stationSelected === station.stationId
      );
    });
    setListStationSelected(result);
  };
  const onSubmit = handleSubmit((data) => {
    if (isEmpty(listStationSelected)) {
      toast.warn("Xin hãy chọn trạm");
      return;
    }
    setShowButtonConfirm(true);
    let corrdinators = [];
    if (showButtonConfirm) {
      listStationSelected.forEach((element) => {
        const lnglat = element.longitude + "," + element.latitude;
        corrdinators = [...corrdinators, lnglat];
      });
      const corrdinatorResult = corrdinators.join(";");
      routeService
        .mapBoxRenderRoute(corrdinatorResult)
        .then((res) => {
          setRouteLine(res.data);
        })
        .catch((error) => console.log(error));
    }
  });

  const onCancle = () => {
    setShowButtonConfirm(false);
    setRouteLine(null);
  };

  return (
    <Box>
      <ToastContainer></ToastContainer>
      <Loading isLoading={loading} />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Map
            stationList={stationList}
            coordinatorFlyTo={coordinatorFlyTo}
            getStationSelected={getStationSelected}
            routeLine={routeLine}
            map={map}
            mapContainerRef={mapContainerRef}
            setMap={setMap}
          />
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={11.4}>
              <Box>
                <Typography variant="h6">Tạo tuyến</Typography>
              </Box>
              <InputTextField
                label={
                  <span>
                    Tên Tuyến <span className="required"></span>
                  </span>
                }
                name="name"
                control={control}
                register={register}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <Button
                onClick={() => {
                  append({
                    stationId: "",
                  });
                }}
              >
                <AddIcon></AddIcon>
                <Typography variant="body1">Thêm Trạm</Typography>
              </Button> */}
              <Typography variant="h6">Danh sách trạm</Typography>
            </Grid>
            <Grid item xs={12}>
              <ScrollPanel
                style={{
                  width: "100%",
                  minHeight: "70vh",
                }}
              >
                {listStationSelected?.map((item, index) => {
                  return (
                    <Card
                      style={{
                        marginBottom: "15px",
                        padding: "1.25rem",
                      }}
                    >
                      <Box>
                        <Typography variant="body1">
                          <b> Tên trạm:</b> {item.name}
                        </Typography>
                        <Typography variant="body1">
                          <b> Địa chỉ:</b> {item.address}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          <b>Kinh độ:</b> {item.longitude}
                        </Typography>
                        <Typography variant="body2">
                          <b>Vĩ độ:</b> {item.latitude}
                        </Typography>
                      </Box>
                    </Card>
                  );
                })}
              </ScrollPanel>
            </Grid>
            {!showButtonConfirm ? (
              <>
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Xác nhận trạm
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Lưu
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      onCancle();
                    }}
                  >
                    Hủy
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
