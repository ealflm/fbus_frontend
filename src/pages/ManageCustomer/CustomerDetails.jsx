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
            placeholder="T??m ki???m..."
          />
        </span>
        <Typography
          variant="h6"
          style={{ textAlign: "end", marginRight: "25px" }}
        >
          L???ch s??? chuy???n ??i
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

  return (
    <>
      <Loading isLoading={loading}></Loading>
      <ToastContainer />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", padding: "15px" }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6">Th??ng tin sinh vi??n</Typography>
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
                      primary="T??n sinh vi??n"
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
                      primary="?????a ch???"
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
                      primary="S??? ??i???n tho???i"
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
              S??? chuy???n ???? ??i: {studentDetail?.data?.length}
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
                          <b>T??n tuy???n:</b> {item?.routeInfo?.name}
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>Kho???ng c??ch tuy???n:</b>{" "}
                          {item?.routeInfo?.distance / 1000}/Km
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>T???ng tr???m to??n tuy???n:</b>{" "}
                          {item?.routeInfo?.totalStation} Tr???m
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>L??n t???i tr???m:</b> {item?.startedStationInfo?.name}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">
                          <b>Bi???n s??? xe:</b>{" "}
                          {item?.busVehicleInfo?.licensePlates}
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>S??? ch???:</b> {item?.busVehicleInfo?.seat} Ch???
                        </Typography>
                        <Typography variant="subtitle1">
                          <b>M??u xe:</b> {item?.busVehicleInfo?.color}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            display={"flex"}
                            alignItems={"initial"}
                          >
                            <b>T??n t??i x???: &nbsp;</b>
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
                          <b>S??? ??i???n tho???i:</b> {item?.driverInfo?.phone}
                        </Typography>
                        <Box>
                          <Typography component="legend">????nh gi??</Typography>
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
              emptyMessage="Kh??ng t??m th???y d??? li???u."
              currentPageReportTemplate="??ang xem {first} ?????n {last} c???a {totalRecords} th?? m???c"
            >
              <Column
                field="routeInfo.name"
                header="T??n tuy???n"
                sortable
                style={{ minWidth: "14rem" }}
                body={routeNameBodyTemplate}
              />
              <Column
                field="routeInfo.distance"
                header="Kho???ng c??ch"
                sortable
                style={{ minWidth: "14rem" }}
                body={distanceBodyTemplate}
              />

              <Column
                field="startedStationInfo.name"
                header="L??n t???i tr???m"
                sortable
                filterField="address"
                style={{ minWidth: "14rem" }}
                body={startedStationInfoBodyTemplate}
              />
              <Column
                field="busVehicleInfo.licensePlates"
                header="Bi???n s??? xe"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={busVehicleInfoLicensePlatesBodyTemplate}
              />
              <Column
                field="driverInfo.fullName"
                header="T??n t??i x???"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={driverInfoFullNameBodyTemplate}
              />
              <Column
                field="rating"
                header="????nh gi??"
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
