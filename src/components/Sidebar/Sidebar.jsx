import React, { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import sidebar_routes from "../../assets/JsonData/sidebar_routes";
import { useAuth } from "../../auth/useAuth";
import { Box, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const Sidebar = () => {
  const { user, logout } = useAuth();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeSubMenu, setActivceSubMenu] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          style={{ width: "180px", height: "180px" }}
          src={logo}
          alt="company logo"
        />
      </div>
      <div className="sidebar__item">
        {sidebar_routes.map((nav, index) => {
          return !nav.subMenu ? (
            <NavLink
              to={nav.link}
              key={`nav-${index}`}
              className={`sidebar__item-inner ${
                activeIndex === index && "active"
              }`}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div className="sidebar__menu__item__icon">{nav.icon}</div>
                <div className="sidebar__menu__item__txt">{nav.text}</div>
              </Box>
              {nav.showSubMenu ? (
                <IconButton
                  onClick={() => {
                    setActivceSubMenu(!activeSubMenu);
                  }}
                >
                  {activeSubMenu ? (
                    <ArrowDropDownIcon className="subMenu" />
                  ) : (
                    <ArrowRightIcon className="subMenu" />
                  )}
                </IconButton>
              ) : null}
            </NavLink>
          ) : activeSubMenu ? (
            <NavLink
              to={nav.link}
              key={`nav-${index}`}
              className={`sidebar__item-inner ${
                activeIndex === index && "active"
              }`}
              style={{ paddingLeft: 70, margin: 10 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div style={{ textTransform: "capitalize" }}>{nav.text}</div>
              </Box>
            </NavLink>
          ) : null;
        })}
        {/* <NavLink
          to="/login"
          className="sidebar__item-inner"
          onClick={() => {
            logout();
          }}
        >
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="sidebar__menu__item__txt">Đăng xuất</div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Sidebar;
