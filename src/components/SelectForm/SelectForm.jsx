import { Control, Controller } from 'react-hook-form';
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const SelectForm = ({
  label,
  value,
  options,
  props,
  disabled,
  errors,
  errorMessage,
  required,
  name,
  control,
  helperText,
  messageRequired,
}) => {
  const defaultMessage = 'Trường này là bắt buộc';
  let valueErrors = {};
  let keyErrors = '';
  for (const k in errors) {
    if (k === name) {
      valueErrors = errors[k];
      keyErrors = k;
    }
  }

  const handleErrors = valueErrors
    ? [{ path: keyErrors, message: valueErrors.message }]
    : '';

  const [data, setData] = useState(value || null);
  const [reSize, setReSize] = useState(0);
  const [width, setWidth] = useState(0);

  // const handleChange = (event: any) => {
  //   setdata(event.target.value as string);
  //   if (fetchValueSelect) {
  //     fetchValueSelect(event.target.value as string);
  //   }
  // };
  const selectRef = useRef();
  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        setReSize(window.innerWidth);
      }, 1000);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  useEffect(() => {
    setWidth(selectRef && selectRef.current?.offsetWidth - 38);
  }, [reSize]);
  return (
    <FormControl
      fullWidth
      error={
        handleErrors && !data && handleErrors.some((e) => e?.path === name)
      }
      variant='outlined'
      size='medium'
    >
      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? messageRequired
              ? messageRequired
              : defaultMessage
            : false,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          setData(value);
          return (
            <>
              <InputLabel
                required={required}
                sx={{ color: '#1D1D1B !important' }}
              >
                {label}
              </InputLabel>
              <Select
                {...props}
                variant='outlined'
                sx={{ background: disabled ? '#e4e4e4 !important' : '' }}
                // size="small"
                // multiple={multiple}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                label={label}
                error={
                  handleErrors &&
                  !data &&
                  handleErrors.some((e) => e?.path === name)
                }
                // helperText={
                //   handleErrors &&
                //   handleErrors.some((e: any) => e?.path === name)
                //     ? handleErrors.find((e: any) => e?.path === name).message
                //     : helperText
                //     ? helperText
                //     : ""
                // }

                // {...field}
                ref={selectRef}
              >
                {options &&
                  options.map((option, index) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography
                        sx={{
                          width: width,
                          whiteSpace: 'initial',
                        }}
                      >
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))}
              </Select>
            </>
          );
        }}
      />
      <FormHelperText>
        {handleErrors && !data && handleErrors.some((e) => e?.path === name)
          ? handleErrors.find((e) => e?.path === name).message
          : helperText
          ? helperText
          : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectForm;
