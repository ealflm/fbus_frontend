import React from 'react';

import Table from '../components/table/Table';

import driverList from '../assets/JsonData/drivers-list.json';

import { Link } from 'react-router-dom';

import Badge from '../components/badge/Badge';

const driverTableHead = [
  '',
  'Họ và tên',
  'Đánh giá',
  'Ngày sinh',
  'Số điện thoại',
  'Phương tiện',
  'Lộ Trình',
  'Trạng Thái',
  'Hành động',
];

const driverStatus = {
  'Vô hiệu hóa': 'info',
  'Hoạt động': 'success',
  'Không hoạt động': 'danger',
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.rate}</td>
    <td>{item.birth}</td>
    <td>{item.phone}</td>
    <td>{item.bus}</td>
    <td>{item.route}</td>
    <td>
      <Badge type={driverStatus[item.status]} content={item.status} />
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

const Drivers = () => {
  return (
    <div>
      <div className='page-header'>
        <h2>Tài xế</h2>
      </div>

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <div className='header__table'>
                <Link to='/drivers/create'>
                  <button className='btn-add'>
                    <div className='btn-add__icon'>
                      <i className='bx bx-plus'></i>
                    </div>
                    <div className='btn-add__info'>
                      <span>Tài xế</span>
                    </div>
                  </button>
                </Link>
              </div>
              <Table
                limit='10'
                headData={driverTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={driverList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
