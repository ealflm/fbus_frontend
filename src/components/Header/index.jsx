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
import React, { useState } from "react";
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
import { notificationData, notificationData1 } from "./Mock";
import { firebaseService } from "../../services/FirebaseService";
import jwt_decode from "jwt-decode";
import { registrationToken } from "../../firebase";

function TabPanel(props) {
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
}

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

export default function Header() {
  const { logout, token } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [swrapDriverDialog, setSwrapDriverDialog] = useState(false);
  const classes = useStyles();
  const [idDriver, setIdDriver] = useState();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ driverId: "" });
  const [panelIndex, setPanelIndex] = React.useState(0);

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

        console.log('clearNotifyToken registrationToken -> ', registrationToken);

        resolve(data);

      }).catch(err => {
        console.log('Error clear notify token -> ', err);
      })
    })
  }

  //
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    maxWidth: 400,
    minHeight: 40,
    width: "100%",
    textAlign: "end",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 9,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#eaeaec",
    },
  }));
  const handleOpenSwarp = () => {
    setAnchorEl(null);
    setSwrapDriverDialog(true);
    setIdDriver();
  };
  const onSave = handleSubmit((data) => {
    console.log(data);
  });
  const hideSwarpDriverDialog = () => {
    setSwrapDriverDialog(false);
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
                  <Badge badgeContent={4} color="success">
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
                      <Tab label="Chưa đọc" {...a11yProps(1)} />
                      <Tab label="Thông báo nghỉ" {...a11yProps(2)} />
                      <Tab label="Thông báo đổi" {...a11yProps(3)} />
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
                      {notificationData.map(noti => (
                        <Item
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp();
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              textAlign: "start",
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
                        </Item>
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
                      {notificationData1.map(noti => (
                        <Item
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp();
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              textAlign: "start",
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
                        </Item>
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
                      {notificationData1.map(noti => (
                        <Item
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp();
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              textAlign: "start",
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
                        </Item>
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
                      {notificationData1.map(noti => (
                        <Item
                          key={noti.id}
                          onClick={() => {
                            handleOpenSwarp();
                          }}
                        >
                          <Typography
                            sx={{
                              width: "100%",
                              textAlign: "start",
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
                        </Item>
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
        footer={swarpDriverFooter}
        onHide={hideSwarpDriverDialog}
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
                      <b>Họ và tên:</b> Nguyễn Văn Toang
                    </Typography>
                    <Typography variant="body1">
                      <b>Số điện thoại:</b> 0982354441
                    </Typography>
                    <Typography variant="body1">
                      <b>Địa chỉ:</b> 123 Huỳnh Tấn Phát
                    </Typography>
                    <Typography variant="body1">
                      <b>Đang chạy chuyến:</b> Đại Học FPT
                    </Typography>
                    <Typography variant="body1">
                      <b>Ngày chạy:</b> 02/12/2022
                    </Typography>
                    <Typography variant="body1">
                      <b>Thời gian bắt đầu:</b> 12:00 PM
                    </Typography>
                    <Typography variant="body1">
                      <b>Thời gian kết thúc:</b> 13:00 PM
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4} textAlign={"center"}>
                  <Avatar
                    alt="Avaatr"
                    src={DefaultAvatar}
                    sx={{ width: 200, height: 200 }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <SelectForm
              label="Chọn tài xế"
              name="driverId"
              required
              control={control}
              // options={}
              errors={errors}
            />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
