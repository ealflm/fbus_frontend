import { Grid, Typography } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputTextField from "../../../components/Input/InputTextFiled";
import MiniMap from "../../../components/MiniMap/MiniMap";
import { stationService } from "../../../services/StationService";
import { toast, ToastContainer } from "react-toastify";
import ADDRESS_VN from "../../../assets/masterData/Address.json";
import { useState } from "react";
import SelectForm from "../../../components/SelectForm/SelectForm";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { Box } from "@mui/system";

export default function StationManage(props) {
  const {
    showStationDialog,
    setShowStationDialog,
    setRefereshData,
    refershData,
  } = props;
  const initValue = {
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    province: "",
    district: "",
    ward: "",
  };
  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initValue });
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //
  useEffect(() => {
    reset();
    setProvince(
      ADDRESS_VN.data.map((element) => {
        return {
          value: element.codename,
          label: element.name,
        };
      })
    );
  }, []);
  useEffect(() => {
    setValue("district", "");
    setValue("ward", "");
    const itemFound = ADDRESS_VN?.data?.find(
      (item) => item.codename === watch("province")
    );
    setCurrentDistrict(itemFound?.districts);
    setWard();
    setDistrict(
      itemFound?.districts?.map((item) => {
        return {
          value: item.codename,
          label: item.name,
        };
      })
    );
  }, [watch("province")]);
  useEffect(() => {
    setValue("ward", "");
    const itemFound = currentDistrict?.find(
      (item) => item.codename === watch("district")
    );
    setWard(
      itemFound?.wards?.map((item) => {
        return {
          value: item.codename,
          label: item.name,
        };
      })
    );
  }, [watch("district")]);
  const hideStationDialog = () => {
    // setShowStationDialog(false);
    reset();
    navigate("/maps");
  };
  const getCoordinates = (data) => {
    setValue("longitude", data.lng);
    setValue("latitude", data.lat);
  };

  const onSaveStation = handleSubmit((data) => {
    const provice = ADDRESS_VN?.data.find(
      (item) => item.codename === data.province
    );
    let district;
    if (provice) {
      district = provice?.districts?.find(
        (item) => item.codename === data.district
      );
    }
    let ward;
    if (district) {
      ward = district?.wards?.find((item) => item.codename === data.ward);
    }
    let address =
      data?.address +
      " " +
      ward.name +
      ", " +
      district.name +
      ", " +
      provice.name;

    const payload = {
      ...data,
      address,
    };
    setLoading(true);
    stationService
      .createStation(payload)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        reset();
        navigate("/maps");
        // setRefereshData(new Date().getTime());
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  });

  return (
    <div>
      <ToastContainer></ToastContainer>
      {/* <Dialog
        visible={showStationDialog}
        style={{ width: "90%", height: "90%" }}
        header="Thông tin trạm"
        modal
        className="p-fluid"
        footer={stationDialogFooter}
        onHide={hideStationDialog}
      > */}
      <Loading isLoading={loading} />

      <Typography variant="h5">Tạo trạm xe buýt</Typography>
      <Box mt={2}></Box>
      <Grid container spacing={2}>
        <Grid item xs={9} mb={2} style={{ height: "80vh" }}>
          <MiniMap setValue={setValue} getCoordinates={getCoordinates} />
        </Grid>
        <Grid item xs={3} mt={2} sx={{ position: "relative" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputTextField
                label={
                  <span>
                    Tên trạm{" "}
                    <span className={errors.name ? "required" : null}>*</span>
                  </span>
                }
                name="name"
                control={control}
                registerProps={{
                  required: true,
                }}
                register={register}
                error={errors.name}
                errorMessage={errors.name ? "Trường này là bắt buộc" : null}
              />
            </Grid>

            <Grid item xs={12}>
              <InputTextField
                label={
                  <span>
                    Kinh độ{" "}
                    <span className={errors.longitude ? "required" : null}>
                      *
                    </span>
                  </span>
                }
                name="longitude"
                control={control}
                registerProps={{
                  required: true,
                }}
                disabled
                register={register}
                error={errors.longitude}
                errorMessage={
                  errors.longitude ? "Trường này là bắt buộc" : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                label={
                  <span>
                    Vĩ độ{" "}
                    <span className={errors.latitude ? "required" : null}>
                      *
                    </span>
                  </span>
                }
                name="latitude"
                control={control}
                registerProps={{
                  required: true,
                }}
                disabled
                register={register}
                error={errors.latitude}
                errorMessage={errors.latitude ? "Trường này là bắt buộc" : null}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectForm
                label="Tỉnh/Thành phố"
                name="province"
                required
                control={control}
                options={province}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectForm
                label="Quận/Huyện"
                name="district"
                required
                control={control}
                options={district}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectForm
                label="Xã/Phường"
                name="ward"
                required
                control={control}
                options={ward}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                label={
                  <span>
                    Địa chỉ{" "}
                    <span className={errors.address ? "required" : null}>
                      *
                    </span>
                  </span>
                }
                name="address"
                control={control}
                registerProps={{
                  required: true,
                }}
                register={register}
                error={errors.address}
                errorMessage={errors.address ? "Trường này là bắt buộc" : null}
              />
            </Grid>
          </Grid>
          <Box sx={{ position: "absolute", right: 0, bottom: 0 }}>
            <Button
              label="Hủy"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => {
                hideStationDialog();
              }}
            />
            <Button
              label="Lưu"
              icon="pi pi-check"
              className="p-button-text"
              onClick={() => {
                onSaveStation();
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* </Dialog> */}
    </div>
  );
}
