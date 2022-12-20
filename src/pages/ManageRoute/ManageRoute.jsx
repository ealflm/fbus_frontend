import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useEffect } from "react";
import { routeService } from "../../services/RouteService";
import { STATUS } from "../../constants/StatusEnum";
export default function ManageRoute() {
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
  const [routeList, setRouteList] = useState([]);
  const navigate = useNavigate();
  const [route, setRoute] = useState();
  const [deleteRouteDialog, setDeleteRouteDialog] = useState(false);
  const [expandedRows, setExpandedRows] = useState(null);
  //
  useEffect(() => {
    getListRoutes();
  }, []);
  const getListRoutes = () => {
    setLoading(true);
    routeService
      .getListRoutes()
      .then((res) => {
        setRouteList(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  //
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
        <h2 className="m-0">Quản lý tuyến</h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => {
              navigate("/maps/create-route");
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
  const nameStationBodyTemplate = (rowData) => {
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
  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable value={data.stationList} responsiveLayout="scroll">
          <Column
            field="name"
            header="Tên trạm"
            body={nameStationBodyTemplate}
            sortable
          ></Column>
          <Column
            field="address"
            header="Địa chỉ"
            body={addressBodyTemplate}
            sortable
          ></Column>
          <Column
            field="longitude"
            header="Kinh độ"
            body={longitudeBodyTemplate}
            sortable
          ></Column>
          <Column
            field="latitude"
            header="Vĩ độ"
            body={latitudeBodyTemplate}
            sortable
          ></Column>
        </DataTable>
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
  const distanceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.distance / 1000}/Km</span>
      </React.Fragment>
    );
  };
  const totalStationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.totalStation}</span>
      </React.Fragment>
    );
  };
  const allowExpansion = (rowData) => {
    return rowData.stationList.length > 0;
  };

  const showConfirmDelete = (route) => {
    setRoute(route);
    setDeleteRouteDialog(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ width: "30px", height: "30px" }}
          onClick={() => navigate(`/route/view/${rowData.routeId}`)}
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
    routeService
      .deleteRoute(route.routeId)
      .then((res) => {
        toast.success(res.data.message);
        getListRoutes();
        setLoading(false);
        setDeleteRouteDialog(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const hideDeleteRouteDialog = () => {
    setDeleteRouteDialog(false);
  };
  const deleteRouteDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteRouteDialog}
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
              value={routeList}
              paginator
              size="small"
              className="p-datatable-customers"
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="routeId"
              rowHover
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
              filters={filters}
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["name", "distance", "totalStation"]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              <Column expander={allowExpansion} style={{ width: "3em" }} />
              <Column
                field="name"
                header="Tên tuyến"
                sortable
                style={{ minWidth: "14rem" }}
                body={nameBodyTemplate}
              />
              <Column
                field="distance"
                header="Khoảng cách"
                sortable
                style={{ minWidth: "14rem" }}
                body={distanceBodyTemplate}
              />

              <Column
                field="totalStation"
                header="Tổng trạm"
                sortable
                filterField="address"
                style={{ minWidth: "14rem" }}
                body={totalStationBodyTemplate}
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
        visible={deleteRouteDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteRouteDialogFooter}
        onHide={hideDeleteRouteDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {route && (
            <span>
              Bạn có chắc chắn muốn vô hiệu hóa tuyến <b>{route.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
