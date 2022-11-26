import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonExportExcel } from "../../components/ButtonExportExcel/ButtonExportExcel";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { busService } from "../../services/BusServices";
import { Dialog } from "primereact/dialog";
import Loading from "../../components/Loading/Loading";
import { Grid } from "@mui/material";
import InputTextField from "../../components/Input/InputTextFiled";
import { setValueToForm } from "../../utils/helper";
import { toast, ToastContainer } from "react-toastify";
import { BUS_STATUS } from "../../constants/BusStatus";
import { Tag } from "primereact/tag";

const Buses = () => {
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

  let initBus = { licensePlates: "", color: "", seat: "" };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm(initBus);

  const [busList, setBusList] = useState([]);

  const [bus, setBus] = useState();
  //
  const [isSubmit, setIsSubmit] = useState(false);
  // dialog open
  const [busDialog, setBusDialog] = useState(false);
  const [deleteBusDialog, setDeleteBusDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getListBus();
  }, []);

  const getListBus = () => {
    setLoading(true);
    busService.getListBusVehicle().then(
      (res) => {
        console.log(res);
        setBusList(res.data.body);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
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
        <h2 className="m-0">Thông tin xe buýt</h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={createBus}
          />

          <ButtonExportExcel
            dataToExcel={busList}
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

  const colorBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.color}</span>
      </React.Fragment>
    );
  };

  const licensePlatesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.licensePlates}</span>
      </React.Fragment>
    );
  };

  const seatsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.seat}</span>
      </React.Fragment>
    );
  };
  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={BUS_STATUS[rowData.status].severity}>
        {BUS_STATUS[rowData.status].label}
      </Tag>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          style={{ width: "30px", height: "30px" }}
          onClick={() => editBus(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          style={{ width: "30px", height: "30px" }}
          onClick={() => showConfirmDeleteBus(rowData)}
        />
      </React.Fragment>
    );
  };
  const createBus = () => {
    setBus(initBus);
    reset();
    setIsSubmit(false);
    setBusDialog(true);
  };
  const onSaveBus = handleSubmit((data) => {
    hideBusDialog();
    const payload = {
      color: data.color,
      licensePlates: data.licensePlates,
      seat: data.seat,
    };
    if (data.busId) {
      busService
        .updateBusVehicle(payload, data.busId)
        .then((res) => {
          toast.success(res.data.message);
          getListBus();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    } else {
      busService
        .createBusVehicle(payload)
        .then((res) => {
          toast.success(res.data.message);
          getListBus();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }
  });
  const editBus = (bus) => {
    console.log(bus);
    setValueToForm(bus, setValue);
    setBusDialog(true);
  };
  const hideBusDialog = () => {
    setBusDialog(false);
  };
  //
  const showConfirmDeleteBus = (bus) => {
    setBus(bus);
    setDeleteBusDialog(true);
  };
  const confirmDeleteBus = () => {
    console.log(bus);
  };
  const hideDeleteBusDialog = () => {
    setDeleteBusDialog(false);
  };
  //
  const deleteBusDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBusDialog}
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
  const busDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideBusDialog}
      />
      <Button
        label="Lưu"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSaveBus}
      />
    </React.Fragment>
  );
  // Call API
  const deleteProduct = () => {};
  //
  return (
    <div>
      <ToastContainer />
      <Loading isLoading={loading}></Loading>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <DataTable
              header={renderHeader}
              value={busList}
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
              globalFilterFields={["licensePlates", "color", "seat"]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              <Column
                field="licensePlates"
                header="Biển số xe"
                sortable
                style={{ minWidth: "14rem" }}
                body={licensePlatesBodyTemplate}
              />
              <Column
                field="color"
                header="Màu xe"
                sortable
                filterField="color"
                style={{ minWidth: "14rem" }}
                body={colorBodyTemplate}
              />
              <Column
                header="Số chỗ"
                sortable
                sortField="seat"
                filterField="seat"
                style={{ minWidth: "14rem" }}
                body={seatsBodyTemplate}
              />
              <Column
                field="status"
                header="Status"
                sortable
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "10rem" }}
                body={statusBodyTemplate}
              />
              <Column
                header="Hành động"
                headerStyle={{ width: "8rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={busDialog}
        style={{ width: "450px" }}
        header="Tạo mới xe"
        modal
        className="p-fluid"
        footer={busDialogFooter}
        onHide={hideBusDialog}
      >
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Biển số xe <span className="required">*</span>
                </span>
              }
              name="licensePlates"
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.licensePlates}
              errorMessage={
                errors.licensePlates ? "Trường này là bắt buộc" : null
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Màu xe <span className="required">*</span>
                </span>
              }
              name="color"
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.color}
              errorMessage={errors.color ? "Trường này là bắt buộc" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Số chỗ <span className="required">*</span>
                </span>
              }
              name="seat"
              control={control}
              registerProps={{
                required: true,
                pattern: /^[0-9]*$/g,
              }}
              register={register}
              error={errors.seat}
              errorMessage={
                errors.seat && errors.seat?.type === "required"
                  ? "Trường này là bắt buộc"
                  : errors.seat?.type === "pattern"
                  ? "Trường này bắt buộc nhập số"
                  : null
              }
            />
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        visible={deleteBusDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteBusDialogFooter}
        onHide={hideDeleteBusDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {bus && (
            <span>
              Bạn có chắc chắn muốn xóa <b>{bus.licensePlates}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Buses;
