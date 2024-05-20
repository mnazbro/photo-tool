import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

import type { FC } from "react";
import { useAppDispatch, useAppSelector, useSaveState } from "../hooks";
import { setActiveCamera } from "../store/activeSlice";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { Camera } from "../types";
import { BackButton } from "../components/BackButton";

export const SelectCameraPage: FC = () => {
  const cameras = useAppSelector((state) => state.camera.cameras);
  const dispatch = useAppDispatch();
  const saveState = useSaveState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async (camera: Camera) => {
    dispatch(setActiveCamera(camera.id));
    await saveState();
    navigate("/");
    enqueueSnackbar({
      message: `${camera.name} is now active`,
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  return (
    <Stack spacing={1} mt={1}>
      <BackButton />
      <Typography color="text.primary">Select a camera</Typography>
      <List>
        {cameras.map((camera) => (
          <ListItemButton key={camera.id} onClick={() => handleClick(camera)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "info.dark" }}>{camera.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText>
              <Typography color="text.primary">{camera.name}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
};
