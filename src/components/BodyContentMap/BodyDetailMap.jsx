import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useBodyDetailStyles } from "./BodyDetailStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { stationService } from "../../services/StationService";
import { toast, ToastContainer } from "react-toastify";
import { routeService } from "../../services/RouteService";
export default function BodyDetailMap(props) {
  const {
    setShowDetail,
    stationDetail,
    routeDetail,
    setStationDetail,
    setRouteDetail,
    setRefereshData,
    refereshData,
    setRouteLine,
    showLayoutListRoute,
  } = props;
  const styles = useBodyDetailStyles();

  const [showDeleteConfirmDialog, setShowConfirmDeleteDialog] = useState(false);
  const [stationId, setStationId] = useState();
  const [routeId, setRouteId] = useState();
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
    setRouteLine(null);
  };
  const backRouteList = () => {
    setShowDetail(false);
    setRouteDetail(null);
    setRouteLine(null);
  };
  // CUSTOME LAYOUT FOOTER DELETE DIALOG
  const deleteFooterDialog = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          hideDeleteDialog();
        }}
      />
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          confirmDelete();
        }}
      />
    </React.Fragment>
  );
  // HANLDE LOGIC DELETE FUNCTION
  const hanldeDeleteStation = (station) => {
    setStationId(station.stationId);
    setRouteId(null);
    setShowConfirmDeleteDialog(true);
  };
  const hanldeDeleteRoute = (route) => {
    setStationId(null);
    setRouteId(route.routeId);
    setShowConfirmDeleteDialog(true);
  };
  const hideDeleteDialog = () => {
    setShowConfirmDeleteDialog(false);
  };
  const confirmDelete = () => {
    if (stationId) {
      stationService
        .deleteStation(stationId)
        .then((res) => {
          toast.success(res.data.message);
          setShowConfirmDeleteDialog(false);
          setRefereshData(!refereshData);
          backStationList();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else if (routeId) {
      routeService
        .deleteRoute(routeId)
        .then((res) => {
          backRouteList();
          showLayoutListRoute();
          toast.success(res.data.message);
          setShowConfirmDeleteDialog(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <Box>
      <ToastContainer></ToastContainer>
      <Dialog
        visible={showDeleteConfirmDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteFooterDialog}
        onHide={hideDeleteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Bạn có chắc chắn muốn xóa ?</span>
        </div>
      </Dialog>
      {setShowDetail && stationDetail ? (
        <div className={styles.boxBodyDetail}>
          <div className={styles.contentBoxBody}>
            <h4 className={styles.boxBodyTitle}>Chi tiết trạm</h4>
            <Box className={styles.cardBodyList}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {stationDetail.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Địa chỉ: {stationDetail.address}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Kinh độ: {stationDetail.longitude}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
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
              <IconButton
                onClick={() => {
                  hanldeDeleteStation(stationDetail);
                }}
              >
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {routeDetail.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Khoảng cách: {routeDetail.distance}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Số trạm: {routeDetail.totalStation}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Tên trạm:
                    </Typography>
                  </Box>
                  {routeDetail.stationList.map((item, index) => {
                    return (
                      <Typography
                        key={index}
                        variant="subtitle1"
                        color="text.secondary"
                        style={{ textAlign: "end" }}
                      >
                        {item.name}
                      </Typography>
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
            <IconButton
              onClick={() => {
                hanldeDeleteRoute(routeDetail);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ) : null}
    </Box>
  );
}
