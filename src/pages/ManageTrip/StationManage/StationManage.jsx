import { Grid } from '@mui/material';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputTextField from '../../../components/Input/InputTextFiled';
import MiniMap from '../../../components/MiniMap/MiniMap';
import { stationService } from '../../../services/StationService';
import { toast, ToastContainer } from 'react-toastify';

export default function StationManage(props) {
  const {
    showStationDialog,
    setShowStationDialog,
    setRefereshData,
    refershData,
  } = props;
  const initValue = {
    name: '',
    address: '',
    longitude: '',
    latitude: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initValue });

  //
  useEffect(() => {
    reset();
  }, []);

  const hideStationDialog = () => {
    setShowStationDialog(false);
    reset();
  };
  const getCoordinates = (data) => {
    setValue('longitude', data.lng);
    setValue('latitude', data.lat);
  };
  const onSaveStation = handleSubmit((data) => {
    stationService
      .createStation(data)
      .then((res) => {
        toast.success(res.data.message);
        reset();
        setShowStationDialog(false);
        setRefereshData(new Date().getTime());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  });

  const stationDialogFooter = (
    <React.Fragment>
      <Button
        label='Hủy'
        icon='pi pi-times'
        className='p-button-text'
        onClick={() => {
          hideStationDialog();
        }}
      />
      <Button
        label='Lưu'
        icon='pi pi-check'
        className='p-button-text'
        onClick={() => {
          onSaveStation();
        }}
      />
    </React.Fragment>
  );
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Dialog
        visible={showStationDialog}
        style={{ width: '1150px', height: '93vh' }}
        header='Thông tin trạm'
        modal
        className='p-fluid'
        footer={stationDialogFooter}
        onHide={hideStationDialog}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} mb={2} style={{ height: '52vh' }}>
            <MiniMap setValue={setValue} getCoordinates={getCoordinates} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputTextField
                  label={
                    <span>
                      Tên trạm <span className='required'>*</span>
                    </span>
                  }
                  name='name'
                  control={control}
                  registerProps={{
                    required: true,
                  }}
                  register={register}
                  error={errors.name}
                  errorMessage={errors.name ? 'Trường này là bắt buộc' : null}
                />
              </Grid>

              <Grid item xs={4}>
                <InputTextField
                  label={
                    <span>
                      Kinh độ <span className='required'>*</span>
                    </span>
                  }
                  name='longitude'
                  control={control}
                  registerProps={{
                    required: true,
                  }}
                  disabled
                  register={register}
                  error={errors.longitude}
                  errorMessage={
                    errors.longitude ? 'Trường này là bắt buộc' : null
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputTextField
                  label={
                    <span>
                      Vĩ độ <span className='required'>*</span>
                    </span>
                  }
                  name='latitude'
                  control={control}
                  registerProps={{
                    required: true,
                  }}
                  disabled
                  register={register}
                  error={errors.latitude}
                  errorMessage={
                    errors.latitude ? 'Trường này là bắt buộc' : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <InputTextField
                  label={
                    <span>
                      Địa chỉ <span className='required'>*</span>
                    </span>
                  }
                  name='address'
                  control={control}
                  registerProps={{
                    required: true,
                  }}
                  register={register}
                  error={errors.address}
                  errorMessage={
                    errors.address ? 'Trường này là bắt buộc' : null
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
