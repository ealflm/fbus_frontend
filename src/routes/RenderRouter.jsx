import { Navigate, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/ManageCustomer/Customers";
import Drivers from "../pages/ManageDriver/Drivers";
import Trips from "../pages/ManageTrip/Trips";
import Buses from "../pages/ManageBus/Buses";
import CreateBus from "../pages/ManageBus/CreateBus";
import DriverForm from "../pages/ManageDriver/DriverForm";
import RouteManage from "../pages/ManageTrip/RouteManage/RouteManage";
import TripSchedule from "../pages/TripSchedule/TripSchedule";
import DriverDetails from "../pages/ManageDriver/DriverDetails";
import BusDetails from "../pages/ManageBus/BusDetails";
import CustomerDetails from "../pages/ManageCustomer/CustomerDetails";
import StationManage from "../pages/ManageTrip/StationManage/StationManage";

const RouterList = [
  {
    exact: true,
    path: "/",
    element: <Dashboard />,
  },
  {
    exact: true,
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    exact: true,
    path: "/students",
    element: <Customers />,
  },
  {
    exact: true,
    path: "/students/view/:id",
    element: <CustomerDetails />,
  },
  // DRIVER
  {
    exact: true,
    path: "/drivers",
    element: <Drivers />,
  },
  {
    exact: true,
    path: "/drivers/:id",
    element: <DriverForm type="EDIT" />,
  },
  {
    exact: true,
    path: "/drivers/view/:id",
    element: <DriverDetails />,
  },
  {
    exact: true,
    path: "/drivers/create",
    element: <DriverForm type="CREATE" />,
  },
  // BUSES
  {
    exact: true,
    path: "/buses",
    element: <Buses />,
  },
  {
    exact: true,
    path: "/buses/:id",
    element: <CreateBus type="EDIT" />,
  },
  {
    exact: true,
    path: "/buses/view/:id",
    element: <BusDetails />,
  },
  {
    exact: true,
    path: "/buses/create",
    element: <CreateBus type="CREATE" />,
  },
  // TRIPS
  {
    exact: true,
    path: "/maps",
    element: <Trips />,
  },
  {
    exact: true,
    path: "/maps/create-station",
    element: <StationManage />,
  },
  {
    exact: true,
    path: "maps/create-route",
    element: <RouteManage />,
  },
  {
    exact: true,
    path: "/trip-schedule",
    element: <TripSchedule />,
  },
  // REPORTS
  // {
  //   exact: true,
  //   path: '/reports',
  //   element: <Reports />,
  // },
  // // DISCOUNT
  // {
  //   exact: true,
  //   path: '/discounts',
  //   element: <PageNotFound />,
  // },
  // // INVENTORY
  // {
  //   exact: true,
  //   path: '/inventorys',
  //   element: <PageNotFound />,
  // },
  // // SETTING
  // {
  //   exact: true,
  //   path: '/settings',
  //   element: <PageNotFound />,
  // },
];

export const RenderRouter = () => {
  return RouterList.map((item, index) => {
    if ((item.path === "/") | (item.path === "")) {
      return (
        <Route
          key={index}
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
      );
    }
    return <Route key={index} path={item.path} element={item.element} />;
  });
};
