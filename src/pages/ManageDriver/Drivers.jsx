import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Table from '../../components/Table/Table';
import Badge from '../../components/badge/Badge';

import Loading from '../../components/Loading/Loading';

import driverList from '../../assets/JsonData/drivers-list.json';

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
    <td>{index}</td>
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
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDriverList] = useState(driverList);
  const [dataShow, setDataShow] = useState(driverList);
  const [refreshData, setRefreshData] = useState(false);

  const limit = 10;
  let pages = 1;
  let range = [];
  // sort FE

  useEffect(() => {
    setTimeout(() => {
      const initDataShow =
        limit && drivers ? drivers.slice(0, Number(limit)) : drivers;
      if (limit !== undefined) {
        let page = Math.floor(drivers.length / Number(limit));
        pages = drivers.length & (Number(limit) === 0) ? page : page + 1;
        range = [...Array(pages).keys()];
      }
      setDriverList(initDataShow);
      setDataShow(initDataShow);
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleFetchData = (data) => {
    // console.log(dataShow);
    const start = Number(limit) * (data.currentPage - 1);
    const end = start + Number(limit);
    setDataShow(driverList.slice(start, end));
    // console.log(data);
  };
  return (
    <>
      <Loading isLoading={isLoading} />
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
                  headData={driverTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={dataShow}
                  renderBody={(item, index) => renderBody(item, index)}
                  handleRequest={handleFetchData}
                  refreshData={refreshData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drivers;
