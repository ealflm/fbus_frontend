import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { STATION_STATUS } from "../../constants/StationStatus";
import { Tag } from "primereact/tag";
import { stationService } from "../../services/StationService";
import { STATUS } from "../../constants/StatusEnum";
import { Dialog } from "primereact/dialog";
export default function ManageStation() {
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
  const [loading, setLoading] = useState(false);
  const [stationList, setStationList] = useState([]);
  const navigate = useNavigate();
  const [station, setStation] = useState();
  const [deleteStationDialog, setDeleteStationDialog] = useState(false);
  //

  useEffect(() => {
    getListStations();
  }, []);
  const getListStations = () => {
    setLoading(true);
    stationService
      .getListStations()
      .then((res) => {
        setStationList(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
        <h2 className="m-0">Quản lý trạm</h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => {
              navigate("/maps/create-station");
            }}
          />

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
  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.name}</span>
      </React.Fragment>
    );
  };
  const addressBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.address}</span>
      </React.Fragment>
    );
  };
  const longitudeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.longitude}</span>
      </React.Fragment>
    );
  };
  const latitudeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.latitude}</span>
      </React.Fragment>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={STATION_STATUS[rowData?.status]?.severity}>
        {STATION_STATUS[rowData?.status]?.label}
      </Tag>
    );
  };
  const showConfirmDelete = (station) => {
    setStation(station);
    setDeleteStationDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ width: "30px", height: "30px" }}
          onClick={() => navigate(`/station/view/${rowData.stationId}`)}
        />
        {rowData.status !== STATUS.INACTVICE ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning "
            style={{ width: "30px", height: "30px" }}
            onClick={() => showConfirmDelete(rowData)}
          />
        ) : null}
      </React.Fragment>
    );
  };
  const confirmDeleteStation = () => {
    setLoading(true);
    stationService
      .deleteStation(station.stationId)
      .then((res) => {
        toast.success(res.data.message);
        getListStations();
        setLoading(false);
        setDeleteStationDialog(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const hideDeleteStationDialog = () => {
    setDeleteStationDialog(false);
  };
  const deleteStationDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteStationDialog}
      />
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          confirmDeleteStation();
        }}
      />
    </React.Fragment>
  );

  return (
    <div>
      <ToastContainer />
      <Loading isLoading={loading}></Loading>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <DataTable
              header={renderHeader}
              value={stationList}
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
              globalFilterFields={["name", "address", "longitude", "latitude"]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              <Column
                field="name"
                header="Tên trạm"
                sortable
                style={{ minWidth: "14rem" }}
                body={nameBodyTemplate}
              />
              <Column
                field="address"
                header="Địa chỉ"
                sortable
                filterField="phone"
                style={{ minWidth: "14rem" }}
                body={addressBodyTemplate}
              />

              <Column
                field="longitude"
                header="Kinh độ"
                sortable
                filterField="address"
                style={{ minWidth: "14rem" }}
                body={longitudeBodyTemplate}
              />
              <Column
                field="latitude"
                header="Vĩ độ"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={latitudeBodyTemplate}
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
                headerStyle={{ width: "6rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "start", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={deleteStationDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteStationDialogFooter}
        onHide={hideDeleteStationDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {station && (
            <span>
              Bạn có chắc chắn muốn vô hiệu hóa trạm <b>{station.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
