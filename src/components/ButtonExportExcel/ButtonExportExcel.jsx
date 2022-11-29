import React from 'react';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Button } from 'primereact/button';
import { Tooltip } from '@mui/material';
import "./style.css";

export const ButtonExportExcel = (props) => {
  // const ExportIcon = createSvgIcon(
  //   <path d='M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z' />,
  //   'SaveAlt'
  // );
  const { dataToExcel, fileName } = props;

  const exportToExcel = async () => {
    //
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtention = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(dataToExcel);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtention);
  };
  return (
    <>
      <Tooltip title='Excel Export'>
        <Button
          type='button'
          icon='pi pi-file-excel'
          onClick={(e) => {
            exportToExcel(fileName);
          }}
          className='mr-2'
          data-pr-tooltip='XLS'
        ></Button>
      </Tooltip>
      {/* <Tooltip title='Excel Export'>
        <Button
          color='success'
          variant='outlined'
          onClick={(e) => {
            exportToExcel(fileName);
          }}
        >
          <DownloadIcon></DownloadIcon>
        </Button>
      </Tooltip> */}
    </>
  );
};
