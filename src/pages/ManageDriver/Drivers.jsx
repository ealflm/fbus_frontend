import { Grid } from "@mui/material";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import InputTextField from "../../components/Input/InputTextFiled";
import Loading from "../../components/Loading/Loading";
import SelectForm from "../../components/SelectForm/SelectForm";
import { ButtonExportExcel } from "../../components/ButtonExportExcel/ButtonExportExcel";
import {
  DRIVER_STATUS,
  DRIVER_STATUS_DROPDOWN,
} from "../../constants/DriverStatus";
import { setValueToForm } from "../../utils/helper";
import DefaultAvatar from "../../assets/images/default-avatar.png";
import { useDriverFormStyles } from "./DriverFormStyles";
import "./AvatarUpload.css";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import { driverService } from "../../services/DriverService";
import { IMAGE_URL } from "../../configs/baseURL";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../constants/StatusEnum";
export default function Drivers() {
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
  const classes = useDriverFormStyles();
  const navigate = useNavigate();

  const checkPhoneFormat = (value) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!value.match(regexPhoneNumber)) {
      setError("errorPhone", { type: "focus" }, { shouldFocus: true });
    } else {
      clearErrors('errorPhone');
    }
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h2 className="m-0">Quản lý tài xế</h2>
        <div>
          <Button
            label="Tạo mới"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={createDriver}
          />
          <ButtonExportExcel
            dataToExcel={driversList}
            fileName={`Thông tin`}
          ></ButtonExportExcel>
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
        <Chip
          label={rowData?.fullName}
          image={IMAGE_URL.DRIVER_IMAGE + rowData?.photoUrl}
          onImageError={(e) => {
            e.currentTarget.src = DefaultAvatar;
          }}
        />
      </React.Fragment>
    );
  };
  const phoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData?.phone}</span>
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={DRIVER_STATUS[rowData?.status]?.severity}>
        {DRIVER_STATUS[rowData?.status]?.label}
      </Tag>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ width: "30px", height: "30px" }}
          onClick={() => navigate(`/drivers/view/${rowData.driverId}`)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 "
          style={{ width: "30px", height: "30px" }}
          onClick={() => showEditDriver(rowData)}
        />
        {rowData.status !== STATUS.INACTVICE ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning "
            style={{ width: "30px", height: "30px" }}
            onClick={() => showConfirmDeleteDriver(rowData)}
          />
        ) : null}
      </React.Fragment>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const initDriver = {
    driverId: "",
    fullName: "",
    phone: "",
    photoUrl: "",
    address: "",
    status: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm(initDriver);
  //
  const [driversList, setDriverList] = useState();
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState();
  //
  const [imagePreview, setImagePreview] = useState();
  const [uploadFile, setUploadFile] = useState();
  const [driverDialog, setDriverDialog] = useState(false);
  const [deleteFile, setDeleteFile] = useState();
  const [deleteDriverDialog, setDeleteDriverDialog] = useState(false);
  useEffect(() => {
    getListDrivers();
  }, []);
  const getListDrivers = () => {
    setLoading(true);
    driverService
      .getListDrivers()
      .then((res) => {
        setDriverList(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const showEditDriver = (driver) => {
    setDriverDialog(true);
    setValueToForm(driver, setValue);
    setDriver(driver);
    setImagePreview(IMAGE_URL.DRIVER_IMAGE + driver.photoUrl);
  };
  const createDriver = () => {
    reset();
    setDriverDialog(true);
    setDriver(null);
  };
  const hideDriverDialog = () => {
    setDriverDialog(false);
    setDriver(null);
    setImagePreview(null);
    setDeleteFile(null);
  };
  const onSaveDriver = handleSubmit((data) => {
    setLoading(true);
    if (data.driverId) {
      let formData = new FormData();
      formData.append("FullName", data.fullName);
      formData.append("Address", data.address);
      formData.append("Phone", data.phone);
      if (deleteFile) {
        formData.append("DeleteFile", deleteFile.trim());
      }
      if (uploadFile) {
        formData.append("UploadFile", uploadFile);
      }
      formData.append("Status", data.status);
      driverService
        .updateDriver(formData, data.driverId)
        .then((res) => {
          toast.success(res.data.message);
          getListDrivers();
          setDriverDialog(false);
          setUploadFile(null);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      let formData = new FormData();
      formData.append("FullName", data.fullName);
      formData.append("Address", data.address);
      formData.append("Phone", data.phone);
      if (uploadFile) {
        formData.append("UploadFile", uploadFile);
      }
      driverService
        .createDriver(formData)
        .then((res) => {
          toast.success(res.data.message);
          getListDrivers();
          setDriverDialog(false);
          setUploadFile(null);
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    }
  });
  const uploadAvatar = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      if (driver) {
        setDeleteFile(driver.photoUrl);
      }
    }
  };
  const showConfirmDeleteDriver = (driver) => {
    setDriver(driver);
    setDeleteDriverDialog(true);
  };
  const confirmDeleteDriver = () => {
    setLoading(true);
    driverService
      .deleteDriverById(driver.driverId)
      .then((res) => {
        toast.success(res.data.message);
        getListDrivers();
        setLoading(false);
        setDeleteDriverDialog(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const hideDeleteDriverDialog = () => {
    setDeleteDriverDialog(false);
  };
  const deleteDriverDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDriverDialog}
      />
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          confirmDeleteDriver();
        }}
      />
    </React.Fragment>
  );

  const driverDialogFooter = (
    <React.Fragment>
      <Button
        label="Hủy"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDriverDialog}
      />
      <Button
        label="Lưu"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSaveDriver}
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
              value={driversList}
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
              globalFilterFields={["fullName", "phone", "email"]}
              emptyMessage="Không tìm thấy dữ liệu."
              currentPageReportTemplate="Đang xem {first} đến {last} của {totalRecords} thư mục"
            >
              <Column
                field="name"
                header="Họ và tên"
                sortable
                style={{ minWidth: "14rem" }}
                body={nameBodyTemplate}
              />
              <Column
                field="phone"
                header="Số điện thoại"
                sortable
                filterField="phone"
                style={{ minWidth: "14rem" }}
                body={phoneBodyTemplate}
              />

              <Column
                field="address"
                header="Địa chỉ"
                sortable
                filterField="address"
                style={{ minWidth: "14rem" }}
                body={addressBodyTemplate}
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
                headerStyle={{ width: "8rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "start", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={driverDialog}
        style={{ width: "750px" }}
        header="Thông tin tài xế"
        modal
        className="p-fluid"
        footer={driverDialogFooter}
        onHide={hideDriverDialog}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} mb={2}>
            <div className="avatar-upload">
              <div className="avatar-edit">
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={uploadAvatar}
                />
                <label htmlFor="imageUpload" className={classes.imageUpload}>
                  <CameraEnhanceIcon
                    className={classes.iconUpload}
                  ></CameraEnhanceIcon>
                </label>
              </div>
              <div className="avatar-preview">
                <img src={imagePreview ? imagePreview : DefaultAvatar} alt="" />
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <InputTextField
              label={
                <span>
                  Họ và tên <span className="required">*</span>
                </span>
              }
              name="fullName"
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.fullName}
              errorMessage={errors.fullName ? "Trường này là bắt buộc" : null}
            />
          </Grid>
          <Grid item xs={6}>
            <InputTextField
              label={
                <span>
                  Số điện thoại <span className="required">*</span>
                </span>
              }
              disabled={driver?.driverId}
              name="phone"
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.phone || errors.errorPhone}
              errorMessage={errors.phone ? "Trường này là bắt buộc" : errors.errorPhone ? 'Số điện thoại không hợp lệ' : null}
              onChange={(e) => checkPhoneFormat(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Địa chỉ <span className="required">*</span>
                </span>
              }
              name="address"
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.address}
              errorMessage={errors.address ? "Trường này là bắt buộc" : null}
            />
          </Grid>
          {driver?.driverId && (
            <Grid item xs={12}>
              <SelectForm
                label="Trạng thái"
                name="status"
                required
                disabled={driver.status !== STATUS.INACTVICE}
                control={control}
                options={DRIVER_STATUS_DROPDOWN}
                errors={errors}
              />
            </Grid>
          )}
        </Grid>
      </Dialog>
      <Dialog
        visible={deleteDriverDialog}
        style={{ width: "450px" }}
        header="Xác nhận"
        modal
        footer={deleteDriverDialogFooter}
        onHide={hideDeleteDriverDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {driver && (
            <span>
              Bạn có chắc chắn muốn tắt tài xế <b>{driver.fullName}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
