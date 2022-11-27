import { Control, Controller } from "react-hook-form";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";

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
  handleOnChange,
}) => {
  const defaultMessage = "Trường này là bắt buộc";
  let valueErrors = {};
  let keyErrors = "";
  for (const k in errors) {
    if (k === name) {
      valueErrors = errors[k];
      keyErrors = k;
    }
  }

  const handleErrors = valueErrors
    ? [{ path: keyErrors, message: valueErrors.message }]
    : "";

  const [data, setData] = useState(value || null);
  const [reSize, setReSize] = useState(0);
  const [width, setWidth] = useState(0);

  // const handleChange = (event) => {
  //   setdata(event.target.value );
  //   if (fetchValueSelect) {
  //     fetchValueSelect(event.target.value );
  //   }
  // };
  const selectRef = useRef();
  useEffect(() => {
    const listener = () => {
      setTimeout(() => {
        setReSize(window.innerWidth);
      }, 1000);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  useEffect(() => {
    setWidth(selectRef && selectRef.current?.offsetWidth - 38);
    setData(value);
  }, [reSize, value]);
  return (
    <FormControl
      fullWidth
      error={
        handleErrors && !data && handleErrors.some((e) => e?.path === name)
      }
      variant="outlined"
      size="medium"
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
          return (
            <>
              <InputLabel
                required={required}
                sx={{ color: "#1D1D1B !important" }}
              >
                {label}
              </InputLabel>
              <Select
                {...props}
                variant="outlined"
                sx={{ background: disabled ? "#e4e4e4 !important" : "" }}
                onChange={(e) => {
                  onChange(e);
                  // handleOnChange(e);
                }}
                onBlur={onBlur}
                value={value}
                disabled={disabled}
                label={label}
                error={
                  handleErrors &&
                  !data &&
                  handleErrors.some((e) => e?.path === name)
                }
                ref={selectRef}
              >
                {options &&
                  options.map((option, index) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography
                        sx={{
                          width: width,
                          whiteSpace: "initial",
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
          : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectForm;
