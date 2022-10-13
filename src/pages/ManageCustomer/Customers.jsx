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
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customerService.getListCustomers().then(
      (res) => {
        console.log(res);
      },
      (error) => {}
    );
    setCustomers(CustomersList);
    setLoading(false);
  }, []);

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
        <h5 className='m-0'>Customers</h5>
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
              placeholder='Keyword Search'
            />
          </span>
        </div>
      </div>
    );
  };
  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <img
          alt='flag'
          src='images/flag/flag_placeholder.png'
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
          className={`flag flag-${rowData.country.code}`}
          width={30}
        /> */}
        <span className='image-text'>{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative;
    return (
      <React.Fragment>
        <span className='image-text'>{representative.name}</span>
      </React.Fragment>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.balance);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const activityBodyTemplate = (rowData) => {
    return (
      <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>
    );
  };

  const actionBodyTemplate = () => {
    return <Button type='button' icon='pi pi-cog'></Button>;
  };
  // const customHeaderColumns = [
  //   {
  //     field: 'name',
  //     header: 'Name',
  //     sortable: true,
  //     style: '14rem',
  //   },
  //   {
  //     field: 'country.name',
  //     header: 'Country',
  //     sortable: true,
  //     filterField: 'country.name',
  //     style: '14rem',
  //     body: {
  //       countryBodyTemplate: (rowData) => {
  //         return (
  //           <React.Fragment>
  //             <span className='image-text'>{rowData.country.name}</span>
  //           </React.Fragment>
  //         );
  //       },
  //     },
  //   },
  //   {
  //     header: 'Agent',
  //     sortable: true,
  //     sortField: 'representative.name',
  //     filterField: 'representative',
  //     style: '14rem',
  //     body: {
  //       representativeBodyTemplate: (rowData) => {
  //         const representative = rowData.representative;
  //         return (
  //           <React.Fragment>
  //             <span className='image-text'>{representative.name}</span>
  //           </React.Fragment>
  //         );
  //       },
  //     },
  //   },
  //   {
  //     field: 'date',
  //     header: 'Date',
  //     sortable: true,
  //     filterField: 'date',
  //     dataType: 'date',
  //     style: '14rem',
  //     body: {
  //       dateBodyTemplate: (rowData) => {
  //         const date = new Date(rowData.date);
  //         return date.toLocaleDateString('en-US', {
  //           day: '2-digit',
  //           month: '2-digit',
  //           year: 'numeric',
  //         });
  //       },
  //     },
  //   },
  //   {
  //     field: 'balance',
  //     header: 'Balance',
  //     sortable: true,
  //     dataType: 'numeric',
  //     style: '8rem',
  //     body: {
  //       balanceBodyTemplate: (rowData) => {
  //         return rowData.balance.toLocaleString('en-US', {
  //           style: 'currency',
  //           currency: 'USD',
  //         });
  //       },
  //     },
  //   },
  //   {
  //     field: 'status',
  //     header: 'Status',
  //     sortable: true,
  //     filterMenuStyle: '14rem',
  //     style: '10rem',
  //     body: {
  //       statusBodyTemplate: (rowData) => {
  //         return (
  //           <React.Fragment>
  //             <span className={`customer-badge status-${rowData.status}`}>
  //               {rowData.status}
  //             </span>
  //           </React.Fragment>
  //         );
  //       },
  //     },
  //   },
  //   {
  //     field: 'activity',
  //     header: 'Activity',
  //     sortable: true,
  //     style: '10rem',
  //     body: {
  //       activityBodyTemplate: (rowData) => {
  //         return (
  //           <React.Fragment>
  //             <ProgressBar
  //               value={rowData.activity}
  //               showValue={false}
  //             ></ProgressBar>
  //           </React.Fragment>
  //         );
  //       },
  //     },
  //   },
  //   {
  //     header: 'Action',
  //     action: true,
  //     style: '8rem',
  //     body: {
  //       actionBodyTemplate: (rowData) => {
  //         return (
  //           <React.Fragment>
  //             <Button type='button' icon='pi pi-cog'></Button>
  //           </React.Fragment>
  //         );
  //       },
  //     },
  //   },
  // ];
  return (
    <div>
      <div className='row'>
        <div className='col-12'>
          {/* <div className='datatable-doc-demo'> */}
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
              loading={loading}
              responsiveLayout='scroll'
              globalFilterFields={[
                'name',
                'country.name',
                'representative.name',
                'balance',
                'status',
              ]}
              emptyMessage='Không tìm thấy dữ liệu.'
              currentPageReportTemplate='Đang xem {first} đến {last} của {totalRecords} thư mục'
            >
              <Column
                field='name'
                header='Name'
                sortable
                style={{ minWidth: '14rem' }}
              />
              <Column
                field='country.name'
                header='Country'
                sortable
                filterField='country.name'
                style={{ minWidth: '14rem' }}
                body={countryBodyTemplate}
              />
              <Column
                header='Agent'
                sortable
                sortField='representative.name'
                filterField='representative'
                style={{ minWidth: '14rem' }}
                body={representativeBodyTemplate}
              />
              <Column
                field='date'
                header='Date'
                sortable
                filterField='date'
                dataType='date'
                style={{ minWidth: '8rem' }}
                body={dateBodyTemplate}
              />
              <Column
                field='balance'
                header='Balance'
                sortable
                dataType='numeric'
                style={{ minWidth: '8rem' }}
                body={balanceBodyTemplate}
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
                field='activity'
                header='Activity'
                sortable
                style={{ minWidth: '10rem' }}
                body={activityBodyTemplate}
              />
              <Column
                headerStyle={{ width: '4rem', textAlign: 'center' }}
                bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Customers;
