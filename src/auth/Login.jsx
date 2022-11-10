import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from './useAuth';
import { authService } from '../services/Authorization';
import Loading from '../components/Loading/Loading';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import { Alert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
export const Login = () => {
  const { setLocalStoragelogin } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    username: '',
    password: '',
  });
  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    authService
      .login(data.username, data.password)
      .then((res) => {
        console.log(res);
        if (res.data.body) {
          setLocalStoragelogin(res.data.body);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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