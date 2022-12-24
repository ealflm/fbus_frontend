import {
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  IconButton,
  Paper,
  Popover,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, memo } from "react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useAuth } from "../../auth/useAuth";
import styled from "styled-components";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SelectForm from "../SelectForm/SelectForm";
import { useForm } from "react-hook-form";
import DefaultAvatar from "../../assets/images/default-avatar.png";
import PropTypes from "prop-types";
import { useStyles } from "./HeaderStyles";
// import { notificationData1 } from "./Mock";
import { firebaseService } from "../../services/FirebaseService";
import jwt_decode from "jwt-decode";
import { registrationToken } from "../../firebase";
import { useEffect } from "react";
import { notificationService } from "../../services/NotificationService";
import { NotifyStatus, NotifyType } from "../../constants/NotifyStatus";
import { driverService } from "../../services/DriverService";
import { tripService } from "../../services/TripService";
import Loading from "../Loading/Loading";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { IMAGE_URL } from "../../configs/baseURL";

const TabPanel = memo((props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
});

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Header() {
  const { logout, token } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [swrapDriverDialog, setSwrapDriverDialog] = useState(false);
  const classes = useStyles();
  const [currentRequest, setCurrentRequest] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ driverId: "" });
  const [panelIndex, setPanelIndex] = React.useState(0);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {

    normalizeNotification().then(notification => {
      setNotifications(notification);
    }).catch(error => {
      console.log(`normalizeNotification Error: ${error}`);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    const handleEventListener = (e) => {
      if (e.detail && e.detail.title && e.detail.body) {
        normalizeNotification().then(notification => {
          setNotifications(notification);
        }).catch(error => {
          console.log(`normalizeNotification Error: ${error}`);
        })
      }
    }

    window.addEventListener('notification', handleEventListener);

    return () => {
      window.removeEventListener('notification', handleEventListener);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizeNotification = async () => {
    const response = await notificationService.getNotification();

    const notis = [];
    const unreads = [];
    const reads = [];
    let unreadItems = 0;

    response.data.body.forEach(item => {
      const noti = {
        id: item.shiftId,
        driverId: item.driverId,
        tripId: item.tripId,
        title: item.type === NotifyType.sendRequest.value ? NotifyType.sendRequest.label : 'Thông báo',
        content: item.content,
        driverPhoto: item.driverPhoto,
        createdDate: moment(item.requestTime).format('DD-MM-YYYY HH:mm:ss'),
        status: item.status
      }

      if (item.status === NotifyStatus.unread.value) {
        unreads.push(noti);
        unreadItems += 1;
      } else {
        reads.push(noti);
      }
      notis.push(noti);
    });

    return { all: notis, unread: unreads, read: reads, unreadCount: unreadItems }
  }

  const clearNotifyToken = () => {
    return new Promise(resolve => {
      var decoded = jwt_decode(token);
      const model = {
        id: decoded.AdminId,
        notificationToken: null
      }
      firebaseService.registrationToken(model).then((data) => {
        console.log('clear notify token successful');

        registrationToken.statusCode = 400;
        registrationToken.token = null;

        resolve(data);

      }).catch(err => {
        console.log('Error clear notify token -> ', err);
      })
    })
  }

  // Click on icon noti
  async function handleClick(event) {
    const anchorEl = event.currentTarget;
    const notification = await normalizeNotification();
    setAnchorEl(anchorEl);
    setNotifications(notification);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentRequest(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const ItemContainer = styled(Paper)(() => ({
    maxWidth: 400,
    width: "100%",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: '10px !important',
    borderRadius: 9,
    boxShadow: "none",
    padding: 8,
    "&:hover": {
      backgroundColor: "#eaeaec",
    },
  }));

  const ItemFirstChild = styled(Paper)(({ hoverBackgroundColor }) => ({
    width: '20%',
    height: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }));

  const ItemSecondChild = styled(Paper)(({ hoverBackgroundColor }) => ({
    width: '80%',
    height: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }));

  const ItemSecondChildLeft = styled(Paper)(({ theme }) => ({
    width: '92%',
    minHeight: 60,
    height: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    backgroundColor: 'transparent'
  }));

  const ItemSecondChildRight = styled(Paper)(({ theme }) => ({
    width: '5%',
    height: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }));

  const ItemStatus = styled(Paper)(({ theme }) => ({
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#2e89ff'
  }));

  const handleOpenSwarp = async (noti) => {

    setLoading(true);

    const normalizeData = {
      request: {
        ...noti
      },
    }

    const driverRes = await driverService.getDriverById(noti.driverId);
    normalizeData.driver = driverRes.data.body.driver

    const tripRes = await tripService.getTripById(noti.tripId);
    normalizeData.trip = tripRes.data.body;

    const availableDrivers = await tripService.getAvailableDrivers(noti.driverId, noti.tripId);
    const hasNoTrip = availableDrivers.data.body.hasNoTrip.map(item => {
      return {
        label: `${item.fullName} - ${item.phone}`,
        value: item.driverId
      }
    });
    const hasTrip = availableDrivers.data.body.hasTrip.map(item => {
      return {
        label: `${item.fullName} - ${item.phone}`,
        value: item.driverId
      }
    });
    normalizeData.availableDrivers = [...hasNoTrip, ...hasTrip]

    setCurrentRequest(normalizeData);
    setAnchorEl(null);
    setSwrapDriverDialog(true);
  };

  const onSave = handleSubmit((data) => {

    setLoading(true);

    const swapDriverModel = {
      requestDriverId: currentRequest.driver.driverId,
      swappedDriverId: data.driverId,
      tripId: currentRequest.trip.tripId
    }

    // Call api DoSwapDriver
    tripService.doSwappedDriver(swapDriverModel).then(async () => {
      await notificationService.makeRequestDone(currentRequest.request.id);
      const notification = await normalizeNotification();
      setLoading(false);
      toast.success('Duyệt đơn thành công');
      setNotifications(notification);
    }).catch(error => {
      console.log('doSwappedDriver error -> ', error);
    });

    // clear and close dialog
    hideSwarpDriverDialog();
  });

  const hideSwarpDriverDialog = () => {
    setSwrapDriverDialog(false);
    setCurrentRequest(null);
    reset();
  };

  const swarpDriverFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideSwarpDriverDialog}
      />
      <Button
        label="Lưu"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSave}
      />
    </React.Fragment>
  );
  const handleChange = (event, newValue) => {
    setPanelIndex(newValue);
  };

  return (
    <>
      <Loading isLoading={isLoading}></Loading>
      <Card style={{ width: "100%", height: "50px" }}>
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
          width={"inherit"}
          height={"inherit"}
        >
          <Grid xs={11}></Grid>
          <Grid
            xs={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                color: "action.active",
              }}
            >
              <Tooltip title="Thông báo">
                <IconButton onClick={handleClick}>
                  <Badge badgeContent={notifications?.unreadCount || 0} color="error" max={999}>
                    <CircleNotificationsIcon color="action" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{
                  paddingLeft: 2,
                }}
              >
                <Typography
                  sx={{
                    paddingTop: 1,
                    fontWeight: "bolder",
                    paddingLeft: 2,
                  }}
                >
                  Thông báo
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Tabs
                      value={panelIndex}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      TabIndicatorProps={{
                        sx: {
                          height: 0,
                        },
                      }}
                      className={classes.tabHeader}
                    >
                      <Tab label="Tất cả" {...a11yProps(0)} />
                      <Tab label="Chưa duyệt" {...a11yProps(1)} />
                      <Tab label="Đã duyệt" {...a11yProps(2)} />
                      <Tab label="Thông báo nghỉ" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <TabPanel
                    value={panelIndex}
                    index={0}
                    className={classes.notifiBody}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                    >
                      {(notifications?.all || []).map(noti => (
                        <ItemContainer
                          // backgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : ""}
                          // hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : "#eaeaec"}
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp(noti);
                          }}
                        >
                          <ItemFirstChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            <img className={classes.avatar} src={noti.driverPhoto ? (IMAGE_URL.DRIVER_IMAGE + noti.driverPhoto) : DefaultAvatar} alt="" />
                          </ItemFirstChild>

                          <ItemSecondChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            {/* Child Left */}
                            <ItemSecondChildLeft>
                              <Typography
                                sx={{
                                  width: "100%",
                                  textAlign: "start",
                                  color: `${noti.status === NotifyStatus.unread.value ? "#555" : "#666"}`,
                                  fontWeight: `${noti.status === NotifyStatus.unread.value ? "bolder" : ""}`
                                }}
                              >
                                {noti.content}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  paddingTop: 0.5,
                                  width: "100%",
                                  textAlign: "end",
                                }}
                              >
                                {noti.createdDate}
                              </Typography>
                            </ItemSecondChildLeft>

                            {/* Child Right */}
                            {noti.status === NotifyStatus.unread.value && <ItemSecondChildRight>
                              <ItemStatus />
                            </ItemSecondChildRight>}

                          </ItemSecondChild>

                        </ItemContainer>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel value={panelIndex} index={1} className={classes.notifiBody}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                    >
                      {(notifications?.unread || []).map(noti => (
                        <ItemContainer
                          // backgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : ""}
                          // hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : "#eaeaec"}
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp(noti);
                          }}
                        >
                          <ItemFirstChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            <img className={classes.avatar} src={noti.driverPhoto ? (IMAGE_URL.DRIVER_IMAGE + noti.driverPhoto) : DefaultAvatar} alt="" />
                          </ItemFirstChild>

                          <ItemSecondChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            {/* Child Left */}
                            <ItemSecondChildLeft>
                              <Typography
                                sx={{
                                  width: "100%",
                                  textAlign: "start",
                                  color: `${noti.status === NotifyStatus.unread.value ? "#555" : "#666"}`,
                                  fontWeight: `${noti.status === NotifyStatus.unread.value ? "bolder" : ""}`
                                }}
                              >
                                {noti.content}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  paddingTop: 0.5,
                                  width: "100%",
                                  textAlign: "end",
                                }}
                              >
                                {noti.createdDate}
                              </Typography>
                            </ItemSecondChildLeft>

                            {/* Child Right */}
                            {noti.status === NotifyStatus.unread.value && <ItemSecondChildRight>
                              <ItemStatus />
                            </ItemSecondChildRight>}

                          </ItemSecondChild>

                        </ItemContainer>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel value={panelIndex} index={2} className={classes.notifiBody}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                    >
                      {(notifications?.read || []).map(noti => (
                        <ItemContainer
                          // backgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : ""}
                          // hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : "#eaeaec"}
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp(noti);
                          }}
                        >
                          <ItemFirstChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            <img className={classes.avatar} src={noti.driverPhoto ? (IMAGE_URL.DRIVER_IMAGE + noti.driverPhoto) : DefaultAvatar} alt="" />
                          </ItemFirstChild>

                          <ItemSecondChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            {/* Child Left */}
                            <ItemSecondChildLeft>
                              <Typography
                                sx={{
                                  width: "100%",
                                  textAlign: "start",
                                  color: `${noti.status === NotifyStatus.unread.value ? "#555" : "#666"}`,
                                  fontWeight: `${noti.status === NotifyStatus.unread.value ? "bolder" : ""}`
                                }}
                              >
                                {noti.content}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  paddingTop: 0.5,
                                  width: "100%",
                                  textAlign: "end",
                                }}
                              >
                                {noti.createdDate}
                              </Typography>
                            </ItemSecondChildLeft>

                            {/* Child Right */}
                            {noti.status === NotifyStatus.unread.value && <ItemSecondChildRight>
                              <ItemStatus />
                            </ItemSecondChildRight>}

                          </ItemSecondChild>

                        </ItemContainer>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel value={panelIndex} index={3} className={classes.notifiBody}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                    >
                      {[].map(noti => (
                        <ItemContainer
                          // backgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : ""}
                          // hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#91c1ff" : "#eaeaec"}
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp(noti);
                          }}
                        >
                          <ItemFirstChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            <img className={classes.avatar} src={noti.driverPhoto ? (IMAGE_URL.DRIVER_IMAGE + noti.driverPhoto) : DefaultAvatar} alt="" />
                          </ItemFirstChild>

                          <ItemSecondChild
                            hoverBackgroundColor={noti.status === NotifyStatus.unread.value ? "#eaeaec" : ""}
                          >
                            {/* Child Left */}
                            <ItemSecondChildLeft>
                              <Typography
                                sx={{
                                  width: "100%",
                                  textAlign: "start",
                                  color: `${noti.status === NotifyStatus.unread.value ? "#000" : ""}`,
                                  fontWeight: `${noti.status === NotifyStatus.unread.value ? "bolder" : ""}`
                                }}
                              >
                                {noti.content}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  paddingTop: 0.5,
                                  width: "100%",
                                  textAlign: "end",
                                }}
                              >
                                {noti.createdDate}
                              </Typography>
                            </ItemSecondChildLeft>

                            {/* Child Right */}
                            {noti.status === NotifyStatus.unread.value && <ItemSecondChildRight>
                              <ItemStatus />
                            </ItemSecondChildRight>}

                          </ItemSecondChild>

                        </ItemContainer>
                      ))}
                    </Stack>
                  </TabPanel>
                </Box>
              </Popover>
            </Box>
            <Box>
              <Tooltip title="Đăng xuất">
                <IconButton
                  onClick={() => {
                    clearNotifyToken().then(data => {
                      logout();
                    }).catch(error => {
                      console.log(error);
                    });
                  }}
                >
                  <i className="bx bx-log-out" style={{ rotate: "180deg" }}></i>
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        visible={swrapDriverDialog}
        style={{ width: 650 }}
        header="Yêu cầu đổi tài xế"
        modal
        className="p-fluid"
        footer={currentRequest?.request.status !== NotifyStatus.read.value && swarpDriverFooter}
        onHide={hideSwarpDriverDialog}
        onShow={() => setLoading(false)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} mb={2}>
            <Card sx={{ height: "auto", padding: 2 }}>
              <Grid container>
                <Grid xs={8}>
                  <Box>
                    <Typography variant="h6">
                      Thông tin tài xế yêu cầu
                    </Typography>
                    <Typography variant="body1">
                      <b>Họ và tên:</b> {currentRequest?.driver?.fullName}
                    </Typography>
                    <Typography variant="body1">
                      <b>Số điện thoại:</b> {currentRequest?.driver?.phone}
                    </Typography>
                    <Typography variant="body1">
                      <b>Địa chỉ:</b> {currentRequest?.driver?.address}
                    </Typography>
                    <Typography variant="body1">
                      <b>Đang chạy chuyến:</b> {currentRequest?.trip?.route.name}
                    </Typography>
                    <Typography variant="body1">
                      <b>Ngày chạy:</b> {currentRequest?.trip?.date}
                    </Typography>
                    <Typography variant="body1">
                      <b>Thời gian bắt đầu:</b> {currentRequest?.trip?.timeStart}
                    </Typography>
                    <Typography variant="body1">
                      <b>Thời gian kết thúc:</b> {currentRequest?.trip?.timeEnd}
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4} textAlign={"center"}>
                  <Avatar
                    alt="Avatar"
                    src={currentRequest?.driver.photoUrl ? (IMAGE_URL.DRIVER_IMAGE + currentRequest?.driver.photoUrl) : DefaultAvatar}
                    sx={{ width: 200, height: 200 }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {currentRequest?.request.status === NotifyStatus.unread.value &&
            <Grid item xs={12}>
              <SelectForm
                label="Chọn tài xế mới cho tuyến"
                name="driverId"
                required
                control={control}
                options={currentRequest.availableDrivers}
                errors={errors}
              />
            </Grid>}
          {currentRequest?.request.status === NotifyStatus.read.value &&
            <Typography
              sx={{
                color: 'red',
                paddingLeft: 2
              }}
            >
              <b>Yêu cầu của tài xế đã được duyệt</b>
            </Typography>
          }
        </Grid>
      </Dialog>
    </>
  );
}

export default memo(Header);
