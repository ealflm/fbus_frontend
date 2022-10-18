import React, { useEffect, useState } from 'react';

// import customerList from '../../assets/JsonData/customers-list.json';
// import Table from '../../components/Table/Table';
// import Badge from '../../components/badge/Badge';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

import CustomersList from '../../assets/JsonData/customers-large.json';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { ButtonExportExcel } from '../../components/ButtonExportExcel/ButtonExportExcel';
import { customerService } from '../../services/CustomerServices';
import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';
import {
  STUDENT_STATUS,
  STUDENT_STATUS_DROPDOWN,
} from './../../constants/StudentStatus';
import Loading from '../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Grid } from '@mui/material';
import InputTextField from '../../components/Input/InputTextFiled';
import { useCustomerStyles } from './CustomerStyles';
import { setValueToForm } from '../../utils/helper';
import SelectForm from '../../components/SelectForm/SelectForm';
import { toast, ToastContainer } from 'react-toastify';
import DefaultAvatar from '../../assets/images/default-avatar.png';
const Customers = () => {
  const [customers, setCustomers] = useState();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    'country.name': {
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

  const [student, setStudent] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  //
  const classes = useCustomerStyles();

  //

  const initStudent = {
    studentId: '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    photoUrl: '',
    automaticScheduling: '',
    status: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm(initStudent);
  // popup modal
  const [studentDialog, setStudentDialog] = useState(false);

  useEffect(() => {
    getListStudent();
  }, []);
  const getListStudent = () => {
    setLoading(true);
    customerService.getListCustomers().then(
      (res) => {
        setCustomers(res.data.body);
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
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-content-between align-items-center'>
        <h2 className='m-0'>Quản lý sinh viên</h2>
        <div>
          <ButtonExportExcel
            dataToExcel={customers}
            fileName={`Thông tin`}
          ></ButtonExportExcel>
          <span className='p-input-icon-left ml-2'>
            <i className='pi pi-search' />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder='Tìm kiếm...'
            />
          </span>
        </div>
      </div>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='image-text'>{rowData?.phone}</span>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='image-text'>{rowData?.email}</span>
      </React.Fragment>
    );
  };

  const addressBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='image-text'>{rowData?.address}</span>
      </React.Fragment>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Chip label={rowData?.fullName} image={rowData?.photoUrl} />
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag severity={STUDENT_STATUS[rowData?.status]?.severity}>
        {STUDENT_STATUS[rowData?.status]?.label}
      </Tag>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          style={{ width: '30px', height: '30px' }}
          onClick={() => showEditStudent(rowData)}
        />
        {/* <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          style={{ width: '30px', height: '30px' }}
          onClick={() => showConfirmDeleteBus(rowData)}
        /> */}
      </React.Fragment>
    );
  };
  const showEditStudent = (student) => {
    setStudentDialog(true);
    setStudent(student);
    setValueToForm(student, setValue);
  };
  const onSaveStudent = handleSubmit((data) => {
    if (data.studentId) {
      const formData = new FormData();
      formData.append('FullName', data.fullName);
      formData.append('Phone', data.phone);
      formData.append('address', data.address);
      formData.append('Status', data.status);
      formData.append('PhotoUrl', data.photoUrl);
      customerService
        .updateCustomer(formData, data.studentId)
        .then((res) => {
          hideStudentDialog();
          toast.success(res.data.message);
          getListStudent();
        })
        .catch((error) => {
          toast.error(error.message);
          setLoading(false);
        });
    }
  });
  const hideStudentDialog = () => {
    setStudentDialog(false);
  };

  const studentDialogFooter = (
    <React.Fragment>
      <Button
        label='Hủy'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideStudentDialog}
      />
      <Button
        label='Lưu'
        icon='pi pi-check'
        className='p-button-text'
        onClick={onSaveStudent}
      />
    </React.Fragment>
  );
  return (
    <div>
      <ToastContainer />
      <Loading isLoading={loading}></Loading>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <DataTable
              header={renderHeader}
              value={customers}
              paginator
              size='small'
              className='p-datatable-customers'
              rows={10}
              paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
              rowsPerPageOptions={[10, 25, 50]}
              dataKey='id'
              rowHover
              filters={filters}
              filterDisplay='menu'
              responsiveLayout='scroll'
              globalFilterFields={['fullName', 'phone', 'email']}
              emptyMessage='Không tìm thấy dữ liệu.'
              currentPageReportTemplate='Đang xem {first} đến {last} của {totalRecords} thư mục'
            >
              <Column
                field='name'
                header='Họ và tên'
                sortable
                style={{ minWidth: '14rem' }}
                body={nameBodyTemplate}
              />
              <Column
                field='phone'
                header='Số điện thoại'
                sortable
                filterField='phone'
                style={{ minWidth: '14rem' }}
                body={phoneBodyTemplate}
              />
              <Column
                field='email'
                header='Email'
                sortable
                sortField='email'
                style={{ minWidth: '14rem' }}
                body={emailBodyTemplate}
              />
              <Column
                field='address'
                header='Địa chỉ'
                sortable
                filterField='address'
                style={{ minWidth: '14rem' }}
                body={addressBodyTemplate}
              />
              <Column
                field='status'
                header='Status'
                sortable
                filterMenuStyle={{ width: '14rem' }}
                style={{ minWidth: '10rem' }}
                body={statusBodyTemplate}
              />
              <Column
                headerStyle={{ width: '4rem', textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={studentDialog}
        style={{ width: '750px' }}
        header='Cập nhật thông tin student'
        modal
        className='p-fluid'
        footer={studentDialogFooter}
        onHide={hideStudentDialog}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} mb={2}>
            <div className={classes.avatarCircle}>
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                }}
                src={student?.photoUrl ? student?.photoUrl : DefaultAvatar}
                alt=''
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <InputTextField
              label={
                <span>
                  Họ và tên <span className='required'>*</span>
                </span>
              }
              name='fullName'
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.fullName}
              errorMessage={errors.fullName ? 'Trường này là bắt buộc' : null}
            />
          </Grid>
          <Grid item xs={6}>
            <InputTextField
              label={
                <span>
                  Số điện thoại <span className='required'>*</span>
                </span>
              }
              name='phone'
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.phone}
              errorMessage={errors.phone ? 'Trường này là bắt buộc' : null}
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Email <span className='required'>*</span>
                </span>
              }
              name='email'
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.email}
              errorMessage={errors.email ? 'Trường này là bắt buộc' : null}
            />
          </Grid>
          <Grid item xs={12}>
            <InputTextField
              label={
                <span>
                  Địa chỉ <span className='required'>*</span>
                </span>
              }
              name='address'
              control={control}
              registerProps={{
                required: true,
              }}
              register={register}
              error={errors.address}
              errorMessage={errors.address ? 'Trường này là bắt buộc' : null}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              label='Trạng thái'
              name='status'
              required
              control={control}
              options={STUDENT_STATUS_DROPDOWN}
              errors={errors}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default Customers;
