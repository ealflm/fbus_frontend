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
import DefaultAvatar from "../../assets/images/default-avatar.png";

import BadgeIcon from "@mui/icons-material/Badge";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import { ScrollPanel } from "primereact/scrollpanel";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { formatDate } from "../../utils/helper";
import moment from "moment/moment";
export default function CustomerDetails() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
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
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left ml-2">
          <i className="pi pi-search" />
          <InputText
            size={40}
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Tìm kiếm..."
          />
        </span>
        <Typography
          variant="h6"
          style={{ textAlign: "end", marginRight: "25px" }}
        >
          Lịch sử chuyến đi
        </Typography>
      </div>
    );
  };
  const routeNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.routeInfo.name}</span>
      </React.Fragment>
    );
  };
  const distanceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">
          {rowData?.routeInfo?.distance / 1000}/Km
        </span>
      </React.Fragment>
    );
  };
  const startedStationInfoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.startedStationInfo?.name}</span>
      </React.Fragment>
    );
  };
  const busVehicleInfoLicensePlatesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">
          {rowData?.busVehicleInfo?.licensePlates}
        </span>
      </React.Fragment>
    );
  };
  const driverInfoFullNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.driverInfo?.fullName}</span>
      </React.Fragment>
    );
  };
  const ratingBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Rating
          name="read-only"
          value={
            rowData?.studentTripInfo.rate ? rowData?.studentTripInfo.rate : 0
          }
          readOnly
        ></Rating>
      </React.Fragment>
    );
  };
  const dateInfoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">
          {moment(rowData?.tripInfo?.date).format("DD/MM/YYYY, h:mm A")}
        </span>
      </React.Fragment>
    );
  };
  return (
    <>
      <Loading isLoading={loading}></Loading>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", padding: "15px" }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6">Thông tin sinh viên</Typography>
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
                    onError={(e) => {
                      e.currentTarget.src = DefaultAvatar;
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
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
                      primary="Tên sinh viên"
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
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ textAlign: "start", padding: "15px" }}>
            <Typography variant="h6">
              Số chuyến đã đi: {studentDetail?.data?.length}
            </Typography>
            <Divider variant="fullWidth" />

            {/*  */}

            {/* <ScrollPanel
              style={{ width: "100%", maxHeight: "40vh", height: "80vh" }}
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
            </ScrollPanel> */}
            <DataTable
              header={renderHeader}
              value={studentDetail?.data}
              paginator
              size="small"
              className="p-datatable-customers"
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="id"
              rowHover
              filters={filters}
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={[
                "rating",
                "driverInfo.fullName",
                "busVehicleInfo.licensePlates",
                "startedStationInfo.name",
                "routeInfo.distance",
                "routeInfo.name",
              ]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              <Column
                field="routeInfo.name"
                header="Tên tuyến"
                sortable
                style={{ minWidth: "14rem" }}
                body={routeNameBodyTemplate}
              />
              <Column
                field="routeInfo.distance"
                header="Khoảng cách"
                sortable
                style={{ minWidth: "14rem" }}
                body={distanceBodyTemplate}
              />

              <Column
                field="startedStationInfo.name"
                header="Lên tại trạm"
                sortable
                filterField="address"
                style={{ minWidth: "14rem" }}
                body={startedStationInfoBodyTemplate}
              />
              <Column
                field="tripInfor.date"
                header="Ngày lên xe"
                sortable
                style={{ minWidth: "14rem" }}
                body={dateInfoBodyTemplate}
              />
              <Column
                field="busVehicleInfo.licensePlates"
                header="Biển số xe"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={busVehicleInfoLicensePlatesBodyTemplate}
              />
              <Column
                field="driverInfo.fullName"
                header="Tên tài xế"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={driverInfoFullNameBodyTemplate}
              />
              <Column
                field="rating"
                header="Đánh giá"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={ratingBodyTemplate}
              />
            </DataTable>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
