import { Box, MenuItem, Pagination, Select, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import './Table.css';
import { tableStyles } from './TableStyles';
const Table = (props) => {
  const { headData, renderHead, bodyData, renderBody, handleRequest } = props;
  const classes = tableStyles();
  //

  // const selectPage = (page) => {
  //   const start = Number(limit) * page;
  //   const end = start + Number(limit);

  //   setDataShow(bodyData.slice(start, end));
  //   setCurrPage(page);
  // };
  // API
  const [currPage, setCurrPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchFiled, setSearchFiled] = useState('');
  //
  useEffect(() => {
    // console.log('run again');
    handleSearch();
  }, [currPage, pageSize, searchFiled]);
  //

  const handleChange = (e, value) => {
    setCurrPage(value);
  };
  const handleSearch = () => {
    const paging = {
      currentPage: currPage,
      pageSize: pageSize,
      searchFiled: searchFiled,
    };
    handleRequest(paging);
  };
  return (
    <div>
      <div className='table-wrapper'>
        <table>
          {headData && renderHead ? (
            <thead>
              <tr>{headData.map((item, index) => renderHead(item, index))}</tr>
            </thead>
          ) : null}
          {bodyData && renderBody ? (
            <tbody>
              {bodyData.map((item, index) => renderBody(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      {pageSize > 1 ? (
        <div className='table__pagination'>
          <Stack spacing={2}>
            <Pagination
              count={pageSize}
              showFirstButton
              showLastButton
              page={currPage}
              onChange={handleChange}
            />
          </Stack>
          {/* <Box>
            <p>Số lượng mục trong trang</p>
          </Box>
          <Box className={classes.rowPerPage}>
            <Select
              className={classes.selectRowPerPage}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              value={rowPerPage}
              onChange={handleChange}
            >
              {rowPerPageArray.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Box> */}
          {/* {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? 'active' : ''
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))} */}
        </div>
      ) : null}
    </div>
  );
};

export default Table;
