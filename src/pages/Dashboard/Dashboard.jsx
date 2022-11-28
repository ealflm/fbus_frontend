import React, { useEffect, useState } from "react";
import StatusCard from "../../components/Status-card/StatusCard";
import statusCards from "../../assets/JsonData/status-card-data.json";
import { dashboardService } from "../../services/DashboardService";
import { useRef } from "react";
import {
  TicketID,
  TicketName,
} from "../../components/Chart/models/chart.model";
import LineChart from "../../components/Chart/Linechart";
import BarChart from "../../components/Chart/BarChart";
import { Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { vi } from "date-fns/locale";
import SelectForm from "../../components/SelectForm/SelectForm";
import { WEEK_DROPDOWN } from "../../constants/WeekConst";
import { useForm } from "react-hook-form";
const Dashboard = () => {
  const [studentAccount, setStudentAccount] = useState(0);
  const [driverAccount, setDriverAccount] = useState(0);
  const [busVehicle, setBusVehicle] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [maxYAxisLine, setMaxYAcisLine] = useState(10);
  const [maxYAxisBar, setMaxYAcisBar] = useState(10);
  const currentYear = useRef(new Date().getFullYear());
  const currentMonth = useRef(new Date().getMonth());
  const [yearMonth, setYearMonth] = useState(dayjs(new Date()));
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm({ week: "" });
  // Call API count number of student accounts
  useEffect(() => {
    dashboardService.getStudentAccounts().then((response) => {
      setStudentAccount(response.data.body.all);
      statusCards = statusCards.map((item) => {
        if (item.id === "studentAccount") {
          item.count = response.data.body.all;
        }
        return item;
      });
    });
  }, []);

  // Call API count number of driver accounts
  useEffect(() => {
    dashboardService.getDriverAccounts().then((response) => {
      setDriverAccount(response.data.body.all);
      statusCards = statusCards.map((item) => {
        if (item.id === "driverAccount") {
          item.count = response.data.body.all;
        }
        return item;
      });
    });
  }, []);

  // Call API count number of bus vehicles
  useEffect(() => {
    dashboardService.getBusVehicles().then((response) => {
      setBusVehicle(response.data.body.all);
      statusCards = statusCards.map((item) => {
        if (item.id === "busVehicle") {
          item.count = response.data.body.all;
        }
        return item;
      });
    });
  }, []);

  // Call API count number of new user
  useEffect(() => {
    dashboardService.getNewUsers().then((response) => {
      setBusVehicle(response.data.body.all);
      statusCards = statusCards.map((item) => {
        if (item.id === "newStudentAccount") {
          item.count = response.data.body.all;
        }
        return item;
      });
    });
  }, []);

  // Call API for tracking tickets
  useEffect(() => {
    Promise.all([
      dashboardService.getBookingTickets(),
      dashboardService.getCompleteTickets(),
      dashboardService.getCancelTickets(),
    ]).then((values) => {
      const data = [];
      values.forEach((response, index) => {
        let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if (response.data.body && Object.keys(response.data.body).length > 0) {
          result = Object.keys(response.data.body[currentYear.current]).map(
            (item) => {
              return response.data.body[currentYear.current][item];
            }
          );
        }
        switch (index) {
          case 0:
            data.push({
              id: TicketID.booking,
              name: TicketName.booking,
              data: result,
            });
            break;
          case 1:
            data.push({
              id: TicketID.completed,
              name: TicketName.completed,
              data: result,
            });
            break;
          case 2:
            data.push({
              id: TicketID.canceled,
              name: TicketName.canceled,
              data: result,
            });
            break;
          default:
            break;
        }
      });

      setLineChartData(data);
    });
  }, []);

  useEffect(() => {
    dashboardService.getNumberOfTicketsByDay().then((response) => {
      if (response.data.body && Object.keys(response.data.body).length) {
        const data = [];
        let calculatedMaxYAxis;
        Object.keys(response.data.body).forEach((item) => {
          let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          result = Object.keys(response.data.body[item]).map((item1) => {
            return response.data.body[item][item1];
          });

          calculatedMaxYAxis = Math.max(...result, maxYAxisBar);

          switch (item) {
            case TicketID.booking:
              data.push({
                name: TicketName.booking,
                data: result.slice(20, 27),
              });
              break;
            case TicketID.completed:
              data.push({
                name: TicketName.completed,
                data: result.slice(0, 7),
              });
              break;
            case TicketID.canceled:
              data.push({
                name: TicketName.canceled,
                data: result.slice(0, 7),
              });
              break;
            default:
              break;
          }
        });

        setMaxYAcisBar(calculatedMaxYAxis);
        setBarChartData(data);
      }
    });
  }, []);

  useEffect(() => {
    const payload = {
      week: getValues("week"),
      date: {
        month: dayjs(yearMonth).get("month"),
        year: dayjs(yearMonth).get("year"),
      },
    };
    console.log(payload);
  }, [watch("week"), yearMonth]);
  return (
    <div>
      <h2 className="page-header">Bảng điều khiển</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6">
                {/* status card here */}
                <StatusCard
                  key={index}
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <LineChart
              maxYAxis={maxYAxisLine}
              data={lineChartData}
              height={"100%"}
            />
          </div>
        </div>
        <Grid container spacing={2} style={{ marginLeft: "5px" }}>
          <Grid item xs={2}>
            <SelectForm
              label="Tuần"
              name="week"
              required
              control={control}
              options={WEEK_DROPDOWN}
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider locale={vi} dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["month", "year"]}
                label="Tháng năm"
                inputFormat="MM/YYYY"
                value={yearMonth}
                onChange={(newValue) => {
                  setYearMonth(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <div className="col-12 mt-4">
          <BarChart
            data={barChartData}
            height={"400"}
            currentYear={currentYear.current}
            maxYAxis={maxYAxisBar}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
