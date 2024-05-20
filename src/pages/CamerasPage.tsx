import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";

import { useCallback, useState, type FC } from "react";
import { RouterLink } from "../components/RouterLink";
import { useAppSelector } from "../hooks";
import { selectVisibleCameras } from "../selectors";
import { BackButton } from "../components/BackButton";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { LabeledSwitch } from "../components/LabeledSwitch";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, CardHeader } from "@mui/material";

export const CamerasPage: FC = () => {
  const visibleCameras = useAppSelector(selectVisibleCameras);
  const [showHidden, setShowHidden] = useState(false);
  const handleToggleVisible: NonNullable<SwitchProps["onChange"]> = useCallback(
    (value) => {
      setShowHidden(value.target.checked);
    },
    [showHidden, setShowHidden],
  );

  return (
    <Stack spacing={1} mt={1}>
      <BackButton />
      <RouterLink to="/camera/new">
        <Button fullWidth variant="contained" startIcon={<AddIcon />}>
          New Camera
        </Button>
      </RouterLink>
      <Card>
        <CardHeader title="Cameras" />
        <CardActions>
          <LabeledSwitch label="Show hidden" onChange={handleToggleVisible} />
        </CardActions>
        <CardContent>
          <List>
            {visibleCameras.map((camera) => (
              <RouterLink key={camera.name} to={`/camera/${camera.id}`}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "info.dark" }}>
                      {camera.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography color="text.primary">{camera.name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </RouterLink>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};
