import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { ButtonExportExcel } from "../../components/ButtonExportExcel/ButtonExportExcel";
import { TRIP_STATUS, TRIP_STATUS_DROPDOWN } from "../../constants/TripStatus";
import { useEffect } from "react";
import { tripScheduleService } from "../../services/TripScheduleService";
import { Chip } from "primereact/chip";
import { IMAGE_URL } from "../../configs/baseURL";
import { Dialog } from "primereact/dialog";
import { Box, Grid, TextField } from "@mui/material";
import DefaultAvatar from "../../assets/images/default-avatar.png";

import SelectForm from "../../components/SelectForm/SelectForm";
import { useForm } from "react-hook-form";
import { busService } from "../../services/BusServices";
import { routeService } from "../../services/RouteService";
import { driverService } from "../../services/DriverService";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { getTimeForApi, mapTimeWithUI } from "../../utils/helper";
import "./TripSchedule.css";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { STATUS } from "../../constants/StatusEnum";

export default function TripSchedule() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "driver.fullName": {
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
  let initBus = { routeId: "", driverId: "", date: "", busId: "", status: "" };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm(initBus);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripSchedules, setTripSchedule] = useState([]);
  const [tripScheduleDialog, setTripScheduleDialog] = useState();
  const [trip, setTrip] = useState();
  const [deleteTripDialog, setDeleteTripDialog] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [busList, setBusList] = useState([]);

  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [timeStart, setTimeStart] = useState(dayjs(new Date()));
  const [timeEnd, setTimeEnd] = useState(dayjs(new Date()));
  //
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const getInitDropDownList = () => {
    setLoading(true);
    Promise.all([
      busService.getListBusVehicle(),
      routeService.getListRoutes(),
      driverService.getListDrivers(),
    ])
      .then((values) => {
        const busListMapDropdown = values[0].data.body.map((item) => {
          return {
            value: item.busId,
            label: item.licensePlates,
          };
        });
        const routeListMapDropdown = values[1].data.body.map((item) => {
          return {
            value: item.routeId,
            label: item.name,
          };
        });
        const driverListMapDropdown = values[2].data.body.map((item) => {
          return {
            value: item.driverId,
            label: item.fullName,
          };
        });
        setBusList(busListMapDropdown);
        setRouteList(routeListMapDropdown);
        setDriverList(driverListMapDropdown);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getInitDropDownList();
    getListTripShedule();
  }, []);
  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    console.log(newValue);
  };
  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
    console.log(newValue);
  };
  const handleChangeTimeStart = (newValue) => {
    setTimeStart(newValue);
  };
  const handleChangeTimeEnd = (newValue) => {
    setTimeEnd(newValue);
  };
  const getListTripShedule = () => {
    setLoading(true);
    tripScheduleService.getListTripSchedules().then(
      (res) => {
        setTripSchedule(res.data.body);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const showConfirmDeleteBus = (trip) => {
    setTrip(trip);
    setDeleteTripDialog(true);
  };
  const confirmDeleteBus = () => {
    setLoading(true);
    tripScheduleService
      .deleteTripSchedule(trip.tripId)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        setDeleteTripDialog(false);
        getListTripShedule();
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const hideDeleteTripDialog = () => {
    setTrip(null);
    setDeleteTripDialog(false);
  };
  const hideTripScheduleDialog = () => {
    setTripScheduleDialog(false);
    reset();
  };
  //create trip schedule
  const createTripSchedule = () => {
    setTripScheduleDialog(true);
    setTrip(null);
    reset();
  };
  // edit trip schedule
  const editTripSchedule = (trip) => {
    setTripScheduleDialog(true);
    setTrip(trip);
    setValue("busId", trip.bus.busId);
    setValue("driverId", trip.driver.driverId);
    setValue("routeId", trip.route.routeId);
    setValue("status", trip.status);
    setStartDate(dayjs(trip.startDate));
    setEndDate(dayjs(trip.endDate));
    setTimeStart(mapTimeWithUI(trip.timeStart));
    setTimeEnd(mapTimeWithUI(trip.timeEnd));
  };

  const onSaveTripSchedule = handleSubmit((data) => {
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      toast.warn("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      return;
    }
    setLoading(true);
    const payload = {
      ...data,
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
      timeStart: getTimeForApi(timeStart),
      timeEnd: getTimeForApi(timeEnd),
    };
    if (!trip) {
      tripScheduleService
        .createTripSchedule(payload)
        .then((res) => {
          toast.success(res.data.message);
          getListTripShedule();
          setTripScheduleDialog(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    } else if (trip) {
      tripScheduleService
        .updateTripSchedule(payload, trip.tripId)
        .then((res) => {
          toast.success(res.data.message);
          getListTripShedule();
          setTripScheduleDialog(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }
  });
  //footer trip schedule dialog
  const tripScheduleDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideTripScheduleDialog}
      />
      <Button
        label="Lưu"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSaveTripSchedule}
      />
    </React.Fragment>
  );
  // footer confirm delete
  const deleteBusDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteTripDialog}
      />
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          confirmDeleteBus();
        }}
      />
    </React.Fragment>
  );
  // table render
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h2 className="m-0">Thông tin lịch trình chuyến </h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={createTripSchedule}
          />

          <ButtonExportExcel
            dataToExcel={tripSchedules}
            fileName={`Thông tin`}
          ></ButtonExportExcel>
          <span className="p-input-icon-left ml-2">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Tìm kiếm... "
            />
          </span>
        </div>
      </div>
    );
  };
  const driverNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Chip
          label={rowData.driver.fullName}
          image={IMAGE_URL.DRIVER_IMAGE + rowData?.driver.photoUrl}
          onImageError={(e) => {
            e.currentTarget.src = DefaultAvatar;
          }}
        />
      </React.Fragment>
    );
  };
  const driverPhoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.driver.phone}</span>
      </React.Fragment>
    );
  };
  const routeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.route.name}</span>
      </React.Fragment>
    );
  };

  const licensePlatesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.bus.licensePlates}</span>
      </React.Fragment>
    );
  };

  const seatsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.bus.seat}</span>
      </React.Fragment>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={TRIP_STATUS[rowData.status].severity}>
        {TRIP_STATUS[rowData.status].label}
      </Tag>
    );
  };
  const timeStartBodyTemplete = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.timeStart}</span>
      </React.Fragment>
    );
  };
  const timeEndBodyTemplete = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.timeEnd}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          style={{ width: "30px", height: "30px" }}
          onClick={() => editTripSchedule(rowData)}
        />
        {rowData.status !== STATUS.INACTVICE ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            style={{ width: "30px", height: "30px" }}
            onClick={() => showConfirmDeleteBus(rowData)}
          />
        ) : null}
      </React.Fragment>
    );
  };
  return (
    <div>
      <ToastContainer />
      <Loading isLoading={loading}></Loading>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <DataTable
              header={renderHeader}
              value={tripSchedules}
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
                "driver.fullName",
                "driver.phone",
                "bus.licensePlates",
                "bus.color",
                "route.name",
              ]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              {/* <Column
                header="Hành động"
                headerStyle={{ width: "8rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "start", overflow: "visible" }}
                style={{ minWidth: "8rem" }}
                body={actionBodyTemplate}
              /> */}
              <Column
                field="driver.fullName"
                header="Tên tài xế"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "14rem" }}
                body={driverNameBodyTemplate}
              />
              <Column
                field="driver.phone"
                header="Số điện thoại "
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={driverPhoneBodyTemplate}
              />
              <Column
                field="bus.licensePlates"
                header="Biển số xe"
                sortable
                style={{ minWidth: "10rem" }}
                body={licensePlatesBodyTemplate}
              />
              {/* <Column
                field="bus.color"
                header="Màu xe"
                sortable
                filterField="color"
                style={{ minWidth: "8rem" }}
                body={colorBodyTemplate}
              /> */}
              <Column
                field="bus.seat"
                header="Số chỗ"
                sortable
                sortField="seat"
                filterField="seat"
                style={{ minWidth: "7rem" }}
                body={seatsBodyTemplate}
              />

              <Column
                field="route.name"
                header="Tuyến"
                sortable
                filterMenuStyle={{ minWidth: "17rem" }}
                style={{ minWidth: "17rem" }}
                body={routeBodyTemplate}
              />
              <Column
                field="timeStart"
                header="Thời gian bắt đầu"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "14rem", textAlign: "center" }}
                body={timeStartBodyTemplete}
              />
              <Column
                field="timeStart"
                header="Thời gian kết thúc"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "14rem", textAlign: "center" }}
                body={timeEndBodyTemplete}
              />
              <Column
                field="status"
                header="Trạng thái"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={statusBodyTemplate}
              />
              <Column
                header=""
                headerStyle={{ width: "8rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "start", overflow: "visible" }}
                style={{ minWidth: "8rem" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      {/* layout create trip schedule */}
      <Dialog
        visible={tripScheduleDialog}
        style={{ width: "550px" }}
        header={trip ? "Chỉnh sửa thông tin chuyến" : "Tạo thông tin chuyến"}
        modal
        className="p-fluid"
        footer={tripScheduleDialogFooter}
        onHide={hideTripScheduleDialog}
      >
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <SelectForm
              label="Tên xe"
              name="busId"
              required
              control={control}
              options={busList}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              label="Tên tài xế"
              name="driverId"
              required
              control={control}
              options={driverList}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              label="Tên Tuyến"
              name="routeId"
              required
              control={control}
              options={routeList}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Ngày bắt đầu"
                    inputFormat="DD/MM/YYYY"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Ngày kết thúc"
                    inputFormat="DD/MM/YYYY"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Thời gian bắt đầu"
                value={timeStart}
                onChange={handleChangeTimeStart}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Thời gian kết thúc"
                value={timeEnd}
                onChange={handleChangeTimeEnd}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {trip ? (
            <Grid item xs={12}>
              <SelectForm
                label="Trạng thái"
                name="status"
                required
                control={control}
                options={TRIP_STATUS_DROPDOWN}
                errors={errors}
              />
            </Grid>
          ) : null}
        </Grid>
      </Dialog>
      <Dialog
        visible={deleteTripDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteBusDialogFooter}
        onHide={hideDeleteTripDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {trip && <span>Bạn có chắc chắn muốn xóa chuyến?</span>}
        </div>
      </Dialog>
    </div>
  );
}
