import { Navigate, Route } from 'react-router-dom';
import Blank from '../pages/Blank';
import Dashboard from '../pages/Dashboard/Dashboard';
import Customers from '../pages/ManageCustomer/Customers';
import Drivers from '../pages/ManageDriver/Drivers';
import CreateDriver from '../pages/ManageDriver/CreateDriver';
import Trips from '../pages/ManageTrip/Trips';
import Reports from '../pages/Reports/Reports';
import Buses from '../pages/ManageBus/Buses';
import CreateBus from '../pages/ManageBus/CreateBus';

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
    element: <CreateDriver type='EDIT' />,
  },
  {
    exact: true,
    path: '/drivers/create',
    element: <CreateDriver type='CREATE' />,
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
    element: <CreateBus type='EDIT' />,
  },
  {
    exact: true,
    path: '/buses/create',
    element: <CreateBus type='CREATE' />,
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
    path: '/inventorys',
    element: <Blank />,
  },
  // SETTING
  {
    exact: true,
    path: '/settings',
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
