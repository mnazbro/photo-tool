import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useCallback, type FC } from "react";
import { setDarkMode } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const SettingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.app.isDarkMode);
  const handleSwitchDarkMode: NonNullable<SwitchProps["onChange"]> =
    useCallback(
      (value) => {
        dispatch(setDarkMode(value.target.checked));
      },
      [dispatch, setDarkMode],
    );
  return (
    <List>
      <ListItem
        secondaryAction={
          <Switch onChange={handleSwitchDarkMode} checked={isDarkMode} />
        }
      >
        <Typography color="text.primary">Enable Dark Mode</Typography>
      </ListItem>
    </List>
  );
};
