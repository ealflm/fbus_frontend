import { Navigate, Route } from 'react-router-dom';
import Blank from '../pages/Blank';
import Buses from '../pages/Buses';
import Createbus from '../pages/Createbus';
import Createdriver from '../pages/Createdriver';
import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';
import Drivers from '../pages/Drivers';
import Reports from '../pages/Reports';
import Trips from '../pages/Trips';

const RouterList = [
  {
    exact: true,
    path: '/',
    element: <Dashboard />,
  },
  {
    exact: true,
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    exact: true,
    path: '/customers',
    element: <Customers />,
  },
  // DRIVER
  {
    exact: true,
    path: '/drivers',
    element: <Drivers />,
  },
  {
    exact: true,
    path: '/drivers/:id',
    element: <Createdriver type='EDIT' />,
  },
  {
    exact: true,
    path: '/drivers/create',
    element: <Createdriver type='CREATE' />,
  },
  // BUSES
  {
    exact: true,
    path: '/buses',
    element: <Buses />,
  },
  {
    exact: true,
    path: '/buses/:id',
    element: <Createbus type='EDIT' />,
  },
  {
    exact: true,
    path: '/buses/create',
    element: <Createbus type='CREATE' />,
  },
  // TRIPS
  {
    exact: true,
    path: '/trips',
    element: <Trips />,
  },
  // REPORTS
  {
    exact: true,
    path: '/reports',
    element: <Reports />,
  },
  // DISCOUNT
  {
    exact: true,
    path: '/discounts',
    element: <Blank />,
  },
  // INVENTORY
  {
    exact: true,
    path: '/inventory',
    element: <Blank />,
  },
  // SETTING
  {
    exact: true,
    path: '/setting',
    element: <Blank />,
  },
];

export const RenderRouter = () => {
  return RouterList.map((item, index) => {
    if ((item.path === '/') | (item.path === '')) {
      return (
        <Route
          key={index}
          path='/'
          element={<Navigate to='/dashboard' replace />}
        />
      );
    } else {
      return <Route key={index} path={item.path} element={item.element} />;
    }
  });
};
