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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import styled from "styled-components";
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SelectForm from "../SelectForm/SelectForm";
import { useForm } from "react-hook-form";
import DefaultAvatar from "../../assets/images/default-avatar.png";

export default function Header() {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [swrapDriverDialog, setSwrapDriverDialog] = useState(false);
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
    textAlign: "end",
    width: "110%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f9f9fa",
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
            <Box sx={{ color: "action.active" }}>
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
              >
                <ScrollPanel
                  style={{
                    maxHeight: 350,
                    overflowX: "hidden",
                    overflowY: "hidden",
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.5}
                  >
                    <Item
                      onClick={() => {
                        handleOpenSwarp();
                      }}
                    >
                      <Typography
                        sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
                      >
                        Yêu cầu đổi tài xế cho DanhNLC
                      </Typography>
                      <Typography variant="caption">
                        12:00 PM 02/12/2022.
                      </Typography>
                    </Item>
                    <Item
                      onClick={() => {
                        handleOpenSwarp();
                      }}
                    >
                      <Typography
                        sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
                      >
                        Yêu cầu đổi tài xế cho SangDT
                      </Typography>
                      <Typography variant="caption">
                        12:00 PM 02/12/2022.
                      </Typography>
                    </Item>
                  </Stack>
                </ScrollPanel>
              </Popover>
            </Box>
            <Box>
              <Tooltip title="Đăng xuất">
                <IconButton
                  onClick={() => {
                    logout();
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
