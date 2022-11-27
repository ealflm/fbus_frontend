import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller } from "react-hook-form";
import { isFuture } from "date-fns";
export default function DatePickerComponent(props) {
  const { control, name, label } = props;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: {
            min: (date) => isFuture(date) || "Please, enter a future date",
          },
        }}
        render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
          <DatePicker
            {...field}
            inputRef={ref}
            label={label}
            renderInput={(inputProps) => (
              <TextField
                {...inputProps}
                onBlur={onBlur}
                name={name}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        )}
      />
    </div>
  );
}
