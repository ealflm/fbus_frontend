import { Box, Card, Grid, Rating, Typography } from "@mui/material";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { busService } from "../../services/BusServices";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { formatDate } from "../../utils/helper";
export default function BusDetails() {
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

  const { id } = useParams();
  const [busDetails, setBusDetails] = useState();

  useEffect(() => {
    getDetailsBus();
  }, []);
  const getDetailsBus = () => {
    busService
      .getDetailsBus(id)
      .then((res) => {
        setBusDetails(res.data.body);
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
  //
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        {/* <h2 className="m-0">Th??ng tin chuy???n c???a t??i x???</h2> */}
        <div>
          <span className="p-input-icon-left ml-2">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="T??m ki???m..."
            />
          </span>
        </div>
      </div>
    );
  };

  const driverNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.driver?.fullName}</span>
      </React.Fragment>
    );
  };
  const driverPhoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.driver?.phone}</span>
      </React.Fragment>
    );
  };
  const routeNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.route?.name}</span>
      </React.Fragment>
    );
  };
  const routeDistanceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.route?.distance / 1000}/Km</span>
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
  return (
    <Grid container>
      <ToastContainer />
      <Card
        style={{
          width: "100%",
          maxHeight: "95vh",
          height: "93vh",
          padding: "20px",
        }}
      >
        <Typography variant="h4">Chi ti???t xe bu??t</Typography>

        <Grid item xs={12} mt={2}>
          <Card style={{ width: "100%", height: "10vh" }}>
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
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" mt={2}>
                  Bi???n s??? xe : <b>{busDetails?.busVehicle?.licensePlates}</b>
                </Typography>
                <Typography variant="h5" mt={2}>
                  M??u xe: <b>{busDetails?.busVehicle?.color}</b>
                </Typography>
                <Typography variant="h5" mt={2}>
                  S??? ch???: <b>{busDetails?.busVehicle?.seat}/Ch???</b>
                </Typography>
                <Typography variant="h5" mt={2}>
                  <Rating
                    style={{ width: 200 }}
                    size="large"
                    name="read-only"
                    value={busDetails?.busVehicle?.rate}
                    readOnly
                  />
                </Typography>
              </Box>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="h6">Danh s??ch tuy???n c???a xe</Typography>
          <DataTable
            header={renderHeader}
            value={busDetails?.trips}
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
              "driver.fullName",
              "driver.phone",
            ]}
            emptyMessage="Kh??ng t??m th???y d??? li???u."
            currentPageReportTemplate="??ang xem {first} ?????n {last} c???a {totalRecords} th?? m???c"
            scrollHeight="56vh"
          >
            <Column
              field="driver.fullName"
              header="T??n t??i x???"
              sortable
              filterField="driver.fullName"
              style={{ minWidth: "12rem" }}
              body={driverNameBodyTemplate}
            />
            <Column
              field="driver.phone"
              header="S??? ??i???n tho???i"
              sortable
              filterField="driver.phone"
              style={{ minWidth: "10rem" }}
              body={driverPhoneBodyTemplate}
            />
            <Column
              field="route.name"
              header="Ch???y tuy???n"
              sortable
              filterMenuStyle={{ width: "20rem" }}
              style={{ minWidth: "20rem" }}
              body={routeNameBodyTemplate}
            />
            <Column
              field="route.distance"
              header="Chi???u d??i tuy???n"
              sortable
              filterMenuStyle={{ width: "15rem" }}
              style={{ minWidth: "11rem" }}
              body={routeDistanceBodyTemplate}
            />
            <Column
              field="route.date"
              header="Ng??y ch???y"
              sortable
              filterField="route.date"
              style={{ minWidth: "10rem" }}
              body={dateBodyTemplate}
            />
            <Column
              field="timeStart"
              header="Th???i gian b???t ?????u"
              sortable
              filterMenuStyle={{ width: "17rem" }}
              style={{ minWidth: "12rem" }}
              body={timeStartBodyTemplate}
            />
            <Column
              field="timeEnd"
              header="Th???i gian k???t th??c"
              sortable
              sortField="timeEnd"
              style={{ minWidth: "13rem" }}
              body={timeEndBodyTemplate}
            />
          </DataTable>
        </Grid>
      </Card>
    </Grid>
  );
}
