import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { ScrollPanel } from "primereact/scrollpanel";
import { stationService } from "../../../services/StationService";
import Map from "./Map";
import Loading from "../../../components/Loading/Loading";
import InputTextField from "../../../components/Input/InputTextFiled";
import { useForm } from "react-hook-form";
import { routeService } from "../../../services/RouteService";
import { toast, ToastContainer } from "react-toastify";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import * as polyUtil from "polyline-encoded";
export default function RouteManage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      stationList: [],
    },
  });

  //
  const [loading, setLoading] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [coordinatorFlyTo] = useState();
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);
  const [listStationSelected, setListStationSelected] = useState();
  const [routeLine, setRouteLine] = useState();
  const [distanceList, setDistanceList] = useState([]);
  const [distance, setDistance] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getListStation();
  }, []);

  //
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

  //
  const getStationSelected = (stationListSelected) => {
    const result = stationListSelected.map((stationSelected, index) => {
      return stationList.find(
        (station) => stationSelected === station.stationId
      );
    });
    setListStationSelected(result);
  };

  //
  const onConfirm = () => {
    if (isEmpty(listStationSelected)) {
      toast.warn("Xin hãy chọn trạm");
      return;
    }
    let corrdinators = [];
    let origin;
    listStationSelected.forEach((element, index) => {
      if (index === 0) {
        origin = element.latitude + "," + element.longitude;
      } else {
        const lnglat = element.latitude + "," + element.longitude;
        corrdinators = [...corrdinators, lnglat];
      }
    });
    const corrdinatorResult = corrdinators.join(";");
    setLoading(true);
    routeService
      .mapBoxRenderRoute(origin, corrdinatorResult)
      .then((res) => {
        if (res.data) {
          setRouteLine(
            polyUtil.decode(res.data.routes[0].overview_polyline.points)
          );
          const legs = res.data.routes[0].legs;
          let distanceArr = [0, res.data.routes[0].legs[0].distance.value];
          for (let index = 1; index < legs.length; index++) {
            legs[index].distance.value += legs[index - 1]?.distance.value;
            distanceArr = [...distanceArr, legs[index].distance.value];
          }
          setDistance(distanceArr[distanceArr.length - 1]);
          setDistanceList(distanceArr);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
    setShowButtonConfirm(true);
  };
  const onSubmit = handleSubmit((data) => {
    if (showButtonConfirm) {
      const listStation = listStationSelected.map((item) => {
        return item.stationId;
      });
      const payload = {
        name: data.name,
        distance: distance,
        totalStation: listStationSelected.length,
        stationList: listStation,
        distanceList: distanceList,
      };
      routeService
        .createRoute(payload)
        .then((res) => {
          toast.success("Tạo tuyến thành công");
          navigate("/maps");
        })
        .catch((error) => {
          toast.error("Tạo tuyến thất bại");
        });
    }
  });

  //
  const onCancle = () => {
    setShowButtonConfirm(false);
    setRouteLine(null);
    setDistance(0);
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
          />
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={11.4}>
              <Box style={{ marginBottom: "10px" }}>
                <Typography variant="h6">Tạo tuyến</Typography>
              </Box>
              <InputTextField
                label={
                  <span>
                    Tên Tuyến <span className="required"></span>
                  </span>
                }
                name="name"
                error={errors.name}
                control={control}
                registerProps={{
                  required: true,
                }}
                register={register}
                errorMessage={errors.name ? "Trường này là bắt buộc" : null}
              />
              <Box style={{ marginTop: "10px", paddingLeft: "5px" }}>
                <Typography variant="body1">
                  <b> Độ dài của tuyến là:</b> {(distance / 1000).toFixed(2)}{" "}
                  /Km
                </Typography>
                <Typography variant="body1">
                  <b>Tổng số trạm:</b> {listStationSelected?.length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Danh sách trạm</Typography>
            </Grid>
            <Grid item xs={12}>
              <ScrollPanel
                style={{
                  width: "100%",
                  minHeight: "62vh",
                  height: "50vh",
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
                      onConfirm();
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
