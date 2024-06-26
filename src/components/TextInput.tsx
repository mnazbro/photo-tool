import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import {
  Control,
  Controller,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";

export type TextInputProps<TFieldValues extends FieldValues, TContext> = {
  control: Control<TFieldValues, TContext>;
  label: string;
  name: FieldPathByValue<TFieldValues, string>;
  required?: boolean;
};

export const TextInput = <TFieldValues extends FieldValues, TContext>({
  control,
  name,
  label,
  required = false,
}: TextInputProps<TFieldValues, TContext>): ReactNode => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          helperText={error?.message}
          error={error != null}
          {...field}
        />
      )}
    />
  );
};
