import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ScrollPanel } from "primereact/scrollpanel";
import { stationService } from "../../../services/StationService";
import Map from "./Map";
import Loading from "../../../components/Loading/Loading";
import InputTextField from "../../../components/Input/InputTextFiled";
import { useFieldArray, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import SelectForm from "../../../components/SelectForm/SelectForm";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
export default function RouteManage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      stationList: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "stationList", // unique name for your Field Array
    }
  );
  //
  const [loading, setLoading] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [stationDropDown, setStationDropDown] = useState([]);
  const [coordinatorFlyTo, setCordinatorFlyTo] = useState();
  const [showButtonConfirm, setShowButtonConfirm] = useState(false);
  useEffect(() => {
    getListStation();
  }, []);
  const getListStation = () => {
    setLoading(true);
    stationService
      .getListStations()
      .then((res) => {
        setStationList(res.data.body);
        mapSelectStation(res.data.body);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const mapSelectStation = (stations) => {
    const result = stations.map((item, index) => {
      return { label: item.name, value: item.stationId };
    });
    setStationDropDown(result);
  };
  const onSubmit = handleSubmit((data) => {
    setShowButtonConfirm(true);
    const valueArr = data.stationList.map(function (item) {
      return item.stationId;
    });
    if (checkIfDuplicateExists(valueArr)) {
      toast.warn("Không được chọn trùng trạm");
      setShowButtonConfirm(false);
      return;
    }
    let result = [];
    data.stationList.map((item2, index) => {
      return stationList.map((item, index) => {
        if (item.stationId === item2.stationId) {
          result = [...result, item];
          return result;
        }
      });
    });
    console.log(result);
  });
  const checkIfDuplicateExists = (valueArr) => {
    let isDuplicate;
    isDuplicate = valueArr.some(function (item, idx) {
      return valueArr.indexOf(item) != idx;
    });
    return isDuplicate;
  };
  const onCancle = () => {
    setShowButtonConfirm(false);
  };
  const handleOnChange = (e) => {
    const flyMarkerCoor = stationList.find(
      (item) => item.stationId === e.target.value
    );
    setCordinatorFlyTo(flyMarkerCoor);
  };
  return (
    <Box>
      <ToastContainer></ToastContainer>
      <Loading isLoading={loading} />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Map stationList={stationList} coordinatorFlyTo={coordinatorFlyTo} />
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h6">Tạo tuyến</Typography>
              </Box>
              <InputTextField
                label={
                  <span>
                    Tên Tuyến <span className="required"></span>
                  </span>
                }
                name="name"
                control={control}
                register={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  append({
                    stationId: "",
                  });
                }}
              >
                <AddIcon></AddIcon>
                <Typography variant="body1">Thêm Trạm</Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ScrollPanel
                style={{
                  width: "100%",
                  height: "50vh",
                  border: "1px solid #c7c7c7",
                }}
              >
                {fields.map((field, index) => {
                  return (
                    <Box
                      style={{
                        display: "flex",
                        marginTop: "10px",
                        padding: "0 5px",
                      }}
                      key={field.id}
                    >
                      <SelectForm
                        label="Trạm"
                        name={`stationList.${index}.stationId`}
                        required
                        control={control}
                        options={stationDropDown}
                        errors={errors}
                        handleOnChange={handleOnChange}
                      />
                      <IconButton>
                        <CloseIcon
                          onClick={() => {
                            remove(index);
                          }}
                        ></CloseIcon>
                      </IconButton>
                    </Box>
                  );
                })}
              </ScrollPanel>
            </Grid>
            {!showButtonConfirm ? (
              <>
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Xát nhận trạm
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                  >
                    Lưu
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => {
                      onCancle();
                    }}
                  >
                    Hủy
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
