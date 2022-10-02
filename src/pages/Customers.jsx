import React from 'react'

import Table from '../components/table/Table'

import customerList from '../assets/JsonData/customers-list.json'

// import { Link } from 'react-router-dom'

import Badge from '../components/badge/Badge'


const customerTableHead = [
  '',
  'Họ và tên',
  'email',
  'Số điện thoại',
  'Trạng thái'
  
]

const customerStatus = {
  "Hoạt động": "success",
  "Vô hiệu hóa": "danger",
  "Vi phạm 1 lần": "warning",
  "Vi phạm 2 lần": "info",
  "": "",
}

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td><Badge type={customerStatus[item.status]} content={item.status}/></td>
    {/* <td>
      <div className="action__item">
            <Link to='/edit'><i class='bx bx-edit'></i></Link>
            <Link to='/disabledriver'><i class='bx bx-user-x' ></i></Link>
      </div>
    </td> */}
  </tr>
)

const Customers = () => {
  return (
    <div>
        <div className="page-header">
          <h2>Sinh viên</h2>
        </div>

        <div className='row'>
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Table 
                  limit='10'
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={customerList}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Customers