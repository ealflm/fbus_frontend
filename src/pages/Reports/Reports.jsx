import React from 'react';

import Table from '../../components/table/Table';

import reportList from '../../assets/JsonData/reports-list.json';

const reportTableHead = [
  '',
  'Chuyến xe',
  'Ngày tháng',
  'slot',
  'Biển Xe',
  'Tài xế',
  'Số lượng',
  'chuyến đi',
  'tài xế',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.trip}</td>
    <td>{item.time}</td>
    <td>{item.slot}</td>
    <td>{item.bus}</td>
    <td>{item.driver}</td>
    <td>{item.studentUsing}</td>
    <td>{item.feedbackTrip}</td>
    <td>{item.feedbackDriver}</td>
  </tr>
);

const Reports = () => {
  return (
    <div>
      <div className='page-header'>
        <h2>Đánh giá</h2>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <Table
                limit='10'
                headData={reportTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={reportList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
