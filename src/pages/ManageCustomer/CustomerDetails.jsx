import {
  Avatar,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { IMAGE_URL } from "../../configs/baseURL";
import { customerService } from "../../services/CustomerServices";
import AvatarImgae from "../../assets/images/default-avatar.png";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import BadgeIcon from "@mui/icons-material/Badge";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import { ScrollPanel } from "primereact/scrollpanel";
export default function CustomerDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [studentDetail, setStudentDetail] = useState();
  useEffect(() => {
    getStudentDetail();
  }, [id]);
  const getStudentDetail = () => {
    setLoading(true);
    customerService
      .getDetailCustomer(id)
      .then((res) => {
        setStudentDetail(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loading isLoading={loading}></Loading>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card style={{ textAlign: "center", padding: "15px" }}>
            <Typography variant="h6">Thông tin khách hàng</Typography>
            <Box>
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                src={
                  studentDetail?.photoUrl
                    ? IMAGE_URL.DRIVER_IMAGE + studentDetail?.photoUrl
                    : AvatarImgae
                }
                alt=""
              />
            </Box>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BadgeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Tên khách hàng"
                  secondary={studentDetail?.fullName}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Địa chỉ"
                  secondary={studentDetail?.address}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ContactPhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Số điện thoại"
                  secondary={studentDetail?.phone}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Email"
                  secondary={studentDetail?.email}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card style={{ textAlign: "start", padding: "15px" }}>
            <Typography variant="h6">
              Số chuyến đã đi: {studentDetail?.data?.length}
            </Typography>
            <Divider variant="fullWidth" />
            <Typography
              variant="h6"
              style={{ textAlign: "end", marginRight: "25px" }}
            >
              Lịch sử chuyến đi
            </Typography>
            <ScrollPanel
              style={{ width: "100%", maxHeight: "80vh", height: "80vh" }}
            >
              {studentDetail?.data?.map((item) => {
                return (
                  <Card style={{ margin: "9px", padding: "9px" }}>
                    <Grid container>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          <b>Tên tuyến:</b> {item?.routeInfo?.name}
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Khoảng cách tuyến:</b>{" "}
                          {item?.routeInfo?.distance / 1000}/Km
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Tổng trạm toàn tuyến:</b>{" "}
                          {item?.routeInfo?.totalStation} Trạm
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Lên tại trạm:</b> {item?.startedStationInfo?.name}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          <b>Biển số xe:</b>{" "}
                          {item?.busVehicleInfo?.licensePlates}
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Số chỗ:</b> {item?.busVehicleInfo?.seat} Chỗ
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Màu xe:</b> {item?.busVehicleInfo?.color}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            display={"flex"}
                            alignItems={"initial"}
                          >
                            <b>Tên tài xế: &nbsp;</b>
                            <img
                              style={{ width: "25px", height: "25px" }}
                              src={
                                IMAGE_URL.DRIVER_IMAGE +
                                item?.driverInfo?.photoUrl
                              }
                              alt=""
                            />
                            &nbsp;
                            {item?.driverInfo?.fullName}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                          <b>Số điện thoại:</b> {item?.driverInfo?.phone}
                        </Typography>
                        <Box>
                          <Typography component="legend">Đánh giá</Typography>
                          <Rating
                            name="read-only"
                            value={
                              item.studentTripInfo.rate
                                ? item.studentTripInfo.rate
                                : 0
                            }
                            readOnly
                          ></Rating>
                          <Typography variant="body2">
                            {item.studentTripInfo.feedback}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </ScrollPanel>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
