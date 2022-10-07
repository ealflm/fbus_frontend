import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { CustomerService } from '../../services/CustomerServices';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { ButtonExportExcel } from '../../components/ButtonExportExcel/ButtonExportExcel';
import './TablePrime.css';
export const TablePrime = (props) => {
  const { dataList, headerColumns } = props;
  const { showButtonExportExcel } = props;
  // const [customers, setCustomers] = useState(null);
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
  // const [selectedCustomers, setSelectedCustomers] = useState(null);
  // const representatives = [
  //   { name: 'Amy Elsner', image: 'amyelsner.png' },
  //   { name: 'Anna Fali', image: 'annafali.png' },
  //   { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
  //   { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
  //   { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
  //   { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
  //   { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
  //   { name: 'Onyama Limba', image: 'onyamalimba.png' },
  //   { name: 'Stephen Shaw', image: 'stephenshaw.png' },
  //   { name: 'XuXue Feng', image: 'xuxuefeng.png' },
  // ];

  // const statuses = [
  //   'unqualified',
  //   'qualified',
  //   'new',
  //   'negotiation',
  //   'renewal',
  //   'proposal',
  // ];

  // const customerService = new CustomerService();

  useEffect(() => {
    // customerService.getCustomersLarge().then((data) => {
    //   setCustomers(getCustomers(data));
    //   setLoading(false);
    // });
    // setCustomers(dataList);
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
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
        <h5 className='m-0'>Customers</h5>
        <div>
          {showButtonExportExcel && (
            <ButtonExportExcel
              dataToExcel={dataList}
              fileName={`Thông tin`}
            ></ButtonExportExcel>
          )}
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
        {/* <img
          alt={representative.name}
          src={`images/avatar/${representative.image}`}
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
          width={32}
          style={{ verticalAlign: 'middle' }}
        /> */}
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
  // const representativesItemTemplate = (option) => {
  //   return (
  //     <div className='p-multiselect-representative-option'>
  //       <img
  //         alt={option.name}
  //         src={`images/avatar/${option.image}`}
  //         onError={(e) =>
  //           (e.target.src =
  //             'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
  //         }
  //         width={32}
  //         style={{ verticalAlign: 'middle' }}
  //       />
  //       <span className='image-text'>{option.name}</span>
  //     </div>
  //   );
  // };
  // const representativeFilterTemplate = (options) => {
  //   return (
  //     <React.Fragment>
  //       <div className='mb-3 font-bold'>Agent Picker</div>
  //       <MultiSelect
  //         value={options.value}
  //         options={representatives}
  //         itemTemplate={representativesItemTemplate}
  //         onChange={(e) => options.filterCallback(e.value)}
  //         optionLabel='name'
  //         placeholder='Any'
  //         className='p-column-filter'
  //       />
  //     </React.Fragment>
  //   );
  // };
  // const dateFilterTemplate = (options) => {
  //   return (
  //     <Calendar
  //       value={options.value}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       dateFormat='mm/dd/yy'
  //       placeholder='mm/dd/yyyy'
  //       mask='99/99/9999'
  //     />
  //   );
  // };
  // const balanceFilterTemplate = (options) => {
  //   return (
  //     <InputNumber
  //       value={options.value}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       mode='currency'
  //       currency='USD'
  //       locale='en-US'
  //     />
  //   );
  // };

  // const statusFilterTemplate = (options) => {
  //   return (
  //     <Dropdown
  //       value={options.value}
  //       options={statuses}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder='Select a Status'
  //       className='p-column-filter'
  //       showClear
  //     />
  //   );
  // };
  // const activityFilterTemplate = (options) => {
  //   return (
  //     <React.Fragment>
  //       <Slider
  //         value={options.value}
  //         onChange={(e) => options.filterCallback(e.value)}
  //         range
  //         className='m-3'
  //       ></Slider>
  //       <div className='flex align-items-center justify-content-between px-2'>
  //         <span>{options.value ? options.value[0] : 0}</span>
  //         <span>{options.value ? options.value[1] : 100}</span>
  //       </div>
  //     </React.Fragment>
  //   );
  // };

  // const representativeRowFilterTemplate = (options) => {
  //   return (
  //     <MultiSelect
  //       value={options.value}
  //       options={representatives}
  //       itemTemplate={representativesItemTemplate}
  //       onChange={(e) => options.filterApplyCallback(e.value)}
  //       optionLabel='name'
  //       placeholder='Any'
  //       className='p-column-filter'
  //       maxSelectedLabels={1}
  //     />
  //   );
  // };
  // const statusItemTemplate = (option) => {
  //   return <span className={`customer-badge status-${option}`}>{option}</span>;
  // };
  // const statusRowFilterTemplate = (options) => {
  //   return (
  //     <Dropdown
  //       value={options.value}
  //       options={statuses}
  //       onChange={(e) => options.filterApplyCallback(e.value)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder='Select a Status'
  //       className='p-column-filter'
  //       showClear
  //     />
  //   );
  // };
  // const header = renderHeader();

  return (
    <div className='datatable-doc-demo'>
      <div className='card'>
        <DataTable
          header={renderHeader}
          value={dataList}
          paginator
          className='p-datatable-customers'
          rows={10}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          rowsPerPageOptions={[10, 25, 50]}
          dataKey='id'
          rowHover
          // selection={selectedCustomers}
          // onSelectionChange={(e) => setSelectedCustomers(e.value)}
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
          {headerColumns.map((item, index) => {
            if (item.action) {
              return (
                <Column
                  headerStyle={{ width: '4rem', textAlign: 'center' }}
                  bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                  style={{ minWidth: `${item.style}` }}
                  header={item.header}
                />
              );
            } else {
              return (
                <Column
                  key={index}
                  field={item.field}
                  header={item.header}
                  sortable
                  style={{ minWidth: `${item.style}` }}
                  filterField={item.filterField}
                  dataType={item.dataType}
                  // body={item.body}
                />
              );
            }
          })}
        </DataTable>
      </div>
    </div>
  );
};
