import { Navigate, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Customers from '../pages/ManageCustomer/Customers';
import Drivers from '../pages/ManageDriver/Drivers';
import Trips from '../pages/ManageTrip/Trips';
import Reports from '../pages/Reports/Reports';
import Buses from '../pages/ManageBus/Buses';
import CreateBus from '../pages/ManageBus/CreateBus';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import DriverForm from '../pages/ManageDriver/DriverForm';
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
    element: <DriverForm type='EDIT' />,
  },
  {
    exact: true,
    path: '/drivers/create',
    element: <DriverForm type='CREATE' />,
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
    element: <PageNotFound />,
  },
  // INVENTORY
  {
    exact: true,
    path: '/inventorys',
    element: <PageNotFound />,
  },
  // SETTING
  {
    exact: true,
    path: '/settings',
    element: <PageNotFound />,
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
