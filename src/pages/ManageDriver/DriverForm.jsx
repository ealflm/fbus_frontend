import React from 'react';

import { Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';

import '../../components/createdriver/createdriver.css';
import InputTextField from '../../components/Input/InputTextFiled';

// REACT HOOK FORM
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Grid, Box } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';
// STYLES
import { driverFormStyles } from './DriverFormStyles';
const DriverForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    accountDriver: '',
    driverName: '',
  });
  const classes = driverFormStyles();
  // RENDER
  return (
    <div>
      <h2 className='page-header'>Thêm tài xế</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputTextField
                    label={
                      <span>
                        Tài khoản <span className='required'></span>
                      </span>
                    }
                    name='accountDriver'
                    control={control}
                    register={register}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputTextField
                    label={
                      <span>
                        Tên tài xế <span className='required'></span>
                      </span>
                    }
                    name='driverName'
                    control={control}
                    register={register}
                  />
                </Grid>
              </Grid>

              <Box className={classes.buttonBottom}>
                <Button variant='contained'>Lưu</Button>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
