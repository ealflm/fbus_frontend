import { TextField, Box } from '@mui/material';
import { textFieldSyles } from './TextFieldStyles';
import { Controller } from 'react-hook-form';
import { ChangeEvent, useRef } from 'react';

const InputTextField = ({
  defaultValue,
  disabled,
  label,
  name,
  required,
  type,
  InputProps,
  control,
  register,
  registerProps,
  errorMessage,
  maxLengthValue,
  min,
  max,
  onChange,
  ...props
}) => {
  const styles = textFieldSyles();
  const skip = useRef([]);
  const handleOnchange = (e, onChange) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      onChange(e.target.value);
    }
  };
  const onKeyDown = (event) => {
    if (type === 'number') {
      if (
        event.keyCode === 65 ||
        event.keyCode === 68 ||
        event.keyCode === 231 ||
        event.keyCode === 0
      ) {
        skip.current = [0];
        // setTimeout(() => {
        //   skip.current = [];
        // }, 100);

        event.preventDefault();
        // skip.current = [];
        return;
      }

      if (event.keyCode === 8 && skip.current.length > 0) {
        event.preventDefault();

        skip.current.pop();

        return;
      }
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field }) => (
          <TextField
            {...field}
            {...props}
            {...register(name, { ...registerProps })}
            onKeyDown={(e) =>
              e.key === '+' || (e.key === '-' && e.preventDefault())
            }
            onChange={(e) => {
              if (type === 'number') {
                handleOnchange(e, field.onChange);
              } else {
                field.onChange(e.target.value);
              }
              onChange && onChange(e);
            }}
            type={type}
            label={label}
            fullWidth
            id='filled-helperText'
            disabled={disabled}
            inputProps={{
              maxLength: maxLengthValue,
            }}
            InputLabelProps={{
              classes: {
                root: styles.label,
                focused: styles.focusedLabel,
              },
            }}
            InputProps={{
              // ...InputProps,
              classes: {
                root: errorMessage ? styles.inputRootError : null,
                disabled: styles.disabled,
              },
            }}
          />
        )}
      />
      {errorMessage && (
        <Box className='err-mess'>
          <small>{errorMessage}</small>
        </Box>
      )}
    </>
  );
};

export default InputTextField;
