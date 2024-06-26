import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { useParams } from "react-router";
import { NonIdealState } from "../components/NonIdealState";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks/redux";
import { CameraId } from "../types";

export const CameraPage: FC = () => {
  const { cameraId } = useParams<{ cameraId: CameraId }>();
  const camera = useAppSelector((state) =>
    state.camera.cameras.find((camera) => camera.id === cameraId),
  );

  if (camera == null) {
    return <NonIdealState title="Camera not found" />;
  }

  return (
    <Box>
      <Typography variant="h4" color="text.primary">
        {camera.name}
      </Typography>
      <Typography color="text.secondary">{camera.description}</Typography>
      <Chip label={camera.filmFormat} />
      {camera.hasLightMeter && <Chip label="Has Light Meter" />}
      <List>
        {camera.rolls
          .filter((roll) => roll.visible)
          .map((roll) => {
            return (
              <RouterLink
                key={roll.id}
                to={`/camera/${camera.id}/roll/${roll.id}`}
              >
                <ListItemButton key={roll.id}>
                  <Typography color="text.primary">{roll.name}</Typography>
                </ListItemButton>
              </RouterLink>
            );
          })}
      </List>
    </Box>
  );
};
