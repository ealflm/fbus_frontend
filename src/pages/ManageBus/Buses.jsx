import React from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table/Table';
import Badge from '../../components/badge/Badge';

import busList from '../../assets/JsonData/buses-list.json';
const busTableHead = ['', 'Tuyến', 'Biển số', 'Màu', 'Trạng Thái', 'Hành động'];

const busStatus = {
  'Vô hiệu hóa': 'info',
  'Hoạt động': 'success',
  'Không hoạt động': 'danger',
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.routeName}</td>
    <td>{item.busNumber}</td>
    <td>{item.busColor}</td>
    <td>
      <Badge type={busStatus[item.status]} content={item.status} />
    </td>
    <td>
      <div className='action__item'>
        <Link to='/edit'>
          <i className='bx bx-edit'></i>
        </Link>
        <Link to='/disabledriver'>
          <i className='bx bx-user-x'></i>
        </Link>
      </div>
    </td>
  </tr>
);

const Buses = () => {
  return (
    <div>
      <div className='page-header'>
        <h2>Xe buýt</h2>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <div className='header__table'>
                <Link to='/buses/create'>
                  <button className='btn-add'>
                    <div className='btn-add__icon'>
                      <i className='bx bx-plus'></i>
                    </div>
                    <div className='btn-add__info'>
                      <span>Xe</span>
                    </div>
                  </button>
                </Link>
              </div>
              {/* <Table
                limit='10'
                headData={busTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={busList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buses;
