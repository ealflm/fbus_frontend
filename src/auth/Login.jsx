import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from './useAuth';
import { authService } from '../services/Authorization';
import Loading from '../components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { firebaseService } from '../services/FirebaseService';
import jwt_decode from "jwt-decode";
import { registrationToken, requestPermission } from '../firebase';

export const Login = () => {
  const { setLocalStoragelogin } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm({ username: '', password: '', });

  const handleRegistrationToken = (authToken, deviceToken) => {
    console.log('token -> ', authToken);

    let decoded = jwt_decode(authToken);

    // Define model save noti token
    const saveNotifyTokenModel = {
      id: decoded.AdminId,
      notificationToken: deviceToken
    }

    console.log('saveNotifyTokenModel -> ', saveNotifyTokenModel);

    // Save Notify token to db
    firebaseService.registrationToken(saveNotifyTokenModel).then((data) => {
      console.log("registrationToken successful!", data);
    }).catch(err => {
      console.log("registrationToken failed!", err);
    });
  }

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    authService
      .login(data.username, data.password).then((res) => {
        console.log(res);
        if (res.data.body) {
          // Save auth token in Local Storage
          setLocalStoragelogin(res.data.body);

          if (registrationToken && registrationToken.statusCode === 200) {

            console.log('registrationToken with status 200')
            handleRegistrationToken(res.data.body, registrationToken.token);

          } else { // Failed to get registration token

            console.log('recall requestPermission');
            requestPermission().then(data => {
              handleRegistrationToken(res.data.body, data.token);
            });

          }

        } else {
          toast.error(res.data.message);
        }

        setLoading(false);

      }).catch((error) => {

        toast.error(error.response.data.message);
        setLoading(false);

      });
  });

  return (
    <>
      <Loading isLoading={isLoading}></Loading>
      <ToastContainer />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Đăng nhập
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              name='username'
              {...register('username', { required: true, maxLength: 20 })}
              fullWidth
              id='username'
              label='Tài khoản'
              autoComplete='username'
              autoFocus
            />
            {errors.username?.type === 'required' && (
              <small style={{ color: 'red' }}>Tài khoản không được trống</small>
            )}
            {errors.username?.type === 'maxLength' && (
              <small style={{ color: 'red' }}>
                Tài khoản không được quá 20 kí tự
              </small>
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              {...register('password', { required: true, maxLength: 20 })}
              label='Mật khẩu'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {errors.password?.type === 'required' && (
              <small style={{ color: 'red' }}>Tài khoản không được trống</small>
            )}
            {errors.password?.type === 'maxLength' && (
              <small style={{ color: 'red' }}>
                Mật khẩu không được quá 20 kí tự
              </small>
            )}
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onSubmit()}
            >
              Đăng nhập
            </Button>
            <Grid container>
              {/* <Grid item>
                <Link to='/register' variant='body2'>
                  {"Không c? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
