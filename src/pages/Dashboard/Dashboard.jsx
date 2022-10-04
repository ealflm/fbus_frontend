import React from 'react';

import Chart from 'react-apexcharts';

import StatusCard from '../../components/status-card/StatusCard';

import statusCards from '../../assets/JsonData/status-card-data.json';
import { redirect, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { TablePrime } from './../../components/TablePrime/TablePrime';

const chartOptions = {
  series: [
    {
      name: 'Đặt xe buýt',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: 'Đặt xe được duyệt',
      data: [35, 60, 15, 80, 30, 70, 25, 89, 55],
    },
    {
      name: 'Hủy đặt xe',
      data: [3, 6, 5, 4, 9, 2, 7, 3, 4],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
};

const Dashboard = () => {
  return (
    <div>
      <h2 className='page-header'>Bảng điều khiển</h2>
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            {statusCards.map((item, index) => (
              <div className='col-6'>
                {/* status card here */}
                <StatusCard
                  key={index}
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='col-6'>
          <div className='card full-height'>
            {/* chart */}
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className='col-12'>
          <TablePrime></TablePrime>
          {/* <div className='card'> */}
          {/* <div className='card__header'><h3>Bảng ....</h3></div> */}
          {/* <div className='card__body'> */}
          {/* bang thong ke cai gi do nua */}

          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
