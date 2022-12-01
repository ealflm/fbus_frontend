import { Avatar, Box, Card, Grid, Rating, Typography } from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { driverService } from "../../services/DriverService";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/helper";
import { IMAGE_URL } from "../../configs/baseURL";
import { STUDENT_STATUS } from "../../constants/StudentStatus";
import { Tag } from "primereact/tag";
export default function DriverDetails() {
  const { id } = useParams();
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
  const [driverDetails, setDriverDetails] = useState([]);

  useEffect(() => {
    getDetailDriver();
  }, [id]);
  const getDetailDriver = () => {
    driverService
      .getDriverById(id)
      .then((res) => {
        setDriverDetails(res.data.body);
        console.log(res.data.body);
      })
      .catch((error) => toast.error(error.message));
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
        <h2 className="m-0">Thông tin chuyến của tài xế</h2>
        <div>
          <span className="p-input-icon-left ml-2">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Tìm kiếm..."
            />
          </span>
        </div>
      </div>
    );
  };
  const licensePlatesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.bus?.licensePlates}</span>
      </React.Fragment>
    );
  };
  const busColorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.bus.color}</span>
      </React.Fragment>
    );
  };
  const dateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{formatDate(rowData?.date)}</span>
      </React.Fragment>
    );
  };
  const timeStartBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.timeStart}</span>
      </React.Fragment>
    );
  };
  const timeEndBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.timeEnd}</span>
      </React.Fragment>
    );
  };
  const routeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.route?.name}</span>
      </React.Fragment>
    );
  };
  const distanceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.route.distance / 1000}/Km</span>
      </React.Fragment>
    );
  };
  const totalStationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.route.totalStation}</span>
      </React.Fragment>
    );
  };

  return (
    <Grid container>
      <Card
        style={{
          width: "100%",
          maxHeight: "95vh",
          height: "93vh",
          padding: "20px",
        }}
      >
        <Typography variant="h4">Chi tiết tài xế</Typography>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card style={{ width: "80vh", height: "30vh" }}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                height: "inherit",
              }}
            >
              <Box style={{ textAlign: "center" }}>
                <Avatar
                  alt=""
                  src={IMAGE_URL.DRIVER_IMAGE + driverDetails?.driver?.photoUrl}
                  sx={{ width: 230, height: 230 }}
                />
                <Box mt={2}></Box>
                <Tag
                  severity={
                    STUDENT_STATUS[driverDetails?.driver?.status]?.severity
                  }
                >
                  {STUDENT_STATUS[driverDetails?.driver?.status]?.label}
                </Tag>
              </Box>
              <Box style={{ width: "50%" }}>
                <Box style={{ textAlign: "center" }}>
                  <Rating
                    style={{ width: 200 }}
                    size="large"
                    name="read-only"
                    value={driverDetails.rate}
                    readOnly
                  />
                </Box>

                <Typography variant="h5" mt={2}>
                  Tên tài xế: <b>{driverDetails?.driver?.fullName}</b>
                </Typography>
                <Typography variant="h5" mt={2}>
                  Số điện thoại: <b>{driverDetails?.driver?.phone}</b>
                </Typography>
                <Typography variant="h5" mt={2}>
                  Địa chỉ: <b>{driverDetails?.driver?.address}</b>
                </Typography>
              </Box>
            </Grid>
          </Card>
        </Grid>
        <Box mt={5}></Box>
        <Grid item xs={12}>
          <DataTable
            header={renderHeader}
            value={driverDetails?.trips}
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
              "route.name",
              "bus.color",
              "bus.licensePlates",
            ]}
            emptyMessage="Không tìm thấy dữ liệu."
            currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            scrollHeight="39vh"
          >
            <Column
              field="bus.licensePlates"
              header="Biển số xe"
              sortable
              style={{ minWidth: "12rem" }}
              body={licensePlatesBodyTemplate}
            />
            <Column
              field="bus.color"
              header="Màu xe"
              sortable
              filterField="bus.color"
              style={{ minWidth: "10rem" }}
              body={busColorBodyTemplate}
            />
            <Column
              field="date"
              header="Ngày chạy"
              sortable
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
            />
            <Column
              field="timeStart"
              header="Thời gian bắt đầu"
              sortable
              filterMenuStyle={{ width: "17rem" }}
              style={{ minWidth: "13rem" }}
              body={timeStartBodyTemplate}
            />
            <Column
              field="timeEnd"
              header="Thời gian kết thúc"
              sortable
              filterMenuStyle={{ width: "17rem" }}
              style={{ minWidth: "13rem" }}
              body={timeEndBodyTemplate}
            />
            <Column
              field="route.name"
              header="Tên Tuyến"
              sortable
              sortField="route.name"
              style={{ minWidth: "14rem" }}
              body={routeBodyTemplate}
            />
            <Column
              field="route.distance"
              header="Khoảng cách tuyến"
              sortable
              filterField="address"
              style={{ minWidth: "14rem" }}
              body={distanceBodyTemplate}
            />
            <Column
              field="route.totalStation"
              header="Tổng số trạm"
              sortable
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "10rem" }}
              body={totalStationBodyTemplate}
            />
          </DataTable>
        </Grid>
      </Card>
    </Grid>
  );
}
