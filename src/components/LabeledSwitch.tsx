import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { type ReactNode } from "react";
import { type FieldValues } from "react-hook-form";

export type LabeledSwitchProps = {
  label: string;
  onChange: NonNullable<SwitchProps["onChange"]>;
};

export const LabeledSwitch = ({
  label,
  onChange,
}: LabeledSwitchProps): ReactNode => {
  return (
    <FormControlLabel control={<Switch onChange={onChange} />} label={label} />
  );
};
