import React from 'react'
import'./layout.css' 
import Sidebar from '../sidebar/Sidebar'
// import Topnav from '../topnav/TopNav'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <>
        <Sidebar/>
        <div className={`layout`}>
            <div className="layout__content">
              {/* <Topnav/> */}
              <div className="layout__content-main">
              <Outlet/>
              </div>
                
                
            </div>
        </div>
    </>
  )
}

export default MainLayout