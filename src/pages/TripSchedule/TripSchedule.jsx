import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import React from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { ButtonExportExcel } from "../../components/ButtonExportExcel/ButtonExportExcel";
import { TRIP_STATUS } from "../../constants/TripStatus";
import { useEffect } from "react";
import { tripScheduleService } from "../../services/TripScheduleService";
import { Chip } from "primereact/chip";
import { IMAGE_URL } from "../../configs/baseURL";

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
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [tripSchedules, setTripSchedule] = useState([]);
  //
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  useEffect(() => {
    getListTripShedule();
  }, []);
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
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h2 className="m-0">Thông tin lịch trình chuyến </h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            // onClick={createBus}
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

  const colorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.bus.color}</span>
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
          // onClick={() => editBus(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          style={{ width: "30px", height: "30px" }}
          // onClick={() => showConfirmDeleteBus(rowData)}
        />
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
              <Column
                header="Hành động"
                headerStyle={{ width: "8rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                style={{ minWidth: "8rem" }}
                body={actionBodyTemplate}
              />
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
              <Column
                field="bus.color"
                header="Màu xe"
                sortable
                filterField="color"
                style={{ minWidth: "8rem" }}
                body={colorBodyTemplate}
              />
              <Column
                field="bus.seat"
                header="Số chỗ"
                sortable
                sortField="seat"
                filterField="seat"
                style={{ minWidth: "8rem" }}
                body={seatsBodyTemplate}
              />

              <Column
                field="route.name"
                header="Tuyến"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
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
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
