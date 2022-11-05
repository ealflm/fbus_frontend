import React from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar';
// import Topnav from '../topnav/TopNav'
import { Navigate, Outlet, useOutlet } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

const MainLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <Sidebar />
      <div className={`layout`}>
        <div className='layout__content'>
          {/* <Topnav/> */}
          <div className='layout__content-main'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
