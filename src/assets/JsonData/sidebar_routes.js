const sidebarNav = [
  {
    text: "Bảng điều khiển",
    link: "/dashboard",
    icon: <i className="bx bx-category-alt"></i>,
    section: "home",
  },
  {
    text: "Chuyến đi",
    link: "/trip-schedule",
    icon: <i className="bx bx-trip"></i>,
    section: "trips schedule",
  },
  {
    text: "Sinh viên",
    link: "/students",
    icon: <i className="bx bx-user-pin"></i>,
    section: "students",
  },
  {
    text: "Tài xế",
    link: "/drivers",
    icon: <i className="bx bx-user"></i>,
    section: "drivers",
  },
  {
    text: "Xe buýt",
    link: "/buses",
    icon: <i className="bx bx-bus"></i>,
    section: "buses",
  },
  {
    text: "Quản lý trạm",
    link: "/station",
    icon: <i className="bx bx-station"></i>,
    section: "stations",
  },
  {
    text: "Quản lý tuyến",
    link: "/route",
    icon: <i className="bx bx-stats"></i>,
    section: "route",
  },
  {
    text: "Bản đồ",
    link: "/maps",
    icon: <i className="bx bx-map-alt"></i>,
    section: "maps",
    showSubMenu: true,
  },
  {
    text: "Tạo trạm",
    link: "/maps/create-station",
    icon: <i className="bx bx-map-alt"></i>,
    section: "maps",
    subMenu: true,
  },
  {
    text: "Tạo tuyến",
    link: "/maps/create-route",
    icon: <i className="bx bx-map-alt"></i>,
    section: "maps",
    subMenu: true,
  },

  // {
  //   text: 'Đánh giá',
  //   link: '/reports',
  //   icon: <i className='bx bxs-report'></i>,
  //   section: 'reports',
  // },
  // {
  //   text: 'discount',
  //   link: '/discounts',
  //   icon: <i className='bx bx-gift'></i>,
  //   section: 'discounts',
  // },
  // {
  //   text: 'inventory',
  //   link: '/inventorys',
  //   icon: <i className='bx bx-store-alt'></i>,
  //   section: '',
  // },
  // {
  //   text: 'settings',
  //   link: '/settings',
  //   icon: <i className='bx bx-cog'></i>,
  //   section: '',
  // },
  // {
  //   text: 'logout',
  //   link: '/logout',
  //   icon: <i className='bx bx-log-out'></i>,
  //   section: 'logout',
  // },
];
export default sidebarNav;
