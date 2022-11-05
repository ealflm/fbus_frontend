import React, { useState } from 'react';
import './Sidebar.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import sidebar_routes from '../../assets/JsonData/sidebar_routes';
import { useAuth } from '../../auth/useAuth';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <img src={logo} alt='company logo' />
      </div>
      <div className='sidebar__item'>
        {sidebar_routes.map((nav, index) => (
          <NavLink
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__item-inner ${
              activeIndex === index && 'active'
            }`}
          >
            <div className='sidebar__menu__item__icon'>{nav.icon}</div>
            <div className='sidebar__menu__item__txt'>{nav.text}</div>
          </NavLink>
        ))}
        <NavLink
          to='/login'
          className='sidebar__item-inner'
          onClick={() => {
            logout();
          }}
        >
          <div className='sidebar__menu__item__icon'>
            <i className='bx bx-log-out'></i>
          </div>
          <div className='sidebar__menu__item__txt'>Đăng xuất</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
