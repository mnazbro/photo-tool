import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import type { FC } from "react";
import { type SubmitHandler } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import AlertTitle from "@mui/material/AlertTitle";
import * as z from "zod";
import { BackButton } from "../components/BackButton";
import { useAppDispatch, useSaveState, useZodForm } from "../hooks";
import { BooleanInput } from "../components/BooleanInput";
import { SubmitButton } from "../components/SubmitButton";
import { addCamera } from "../store/cameraSlice";
import { CameraId, FilmFormat } from "../types";
import { v4 } from "uuid";
import { useNavigate } from "react-router";

type FormInputs = {
  name: string;
  description: string;
  filmFormat: string;
  hasLightMeter: boolean;
  notes: string;
};

const defaultValues = {
  name: "",
  description: "",
  filmFormat: "",
  hasLightMeter: false,
  notes: "",
} satisfies FormInputs;

const schema = z.object({
  name: z.string().min(1),
  description: z.string(),
  filmFormat: z.string(),
  hasLightMeter: z.boolean(),
  notes: z.string(),
});

export const NewCameraPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const saveState = useSaveState();
  const { handleSubmit, control } = useZodForm<FormInputs>(
    { defaultValues },
    schema,
  );
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const id: CameraId = `camera_${v4()}`;
    dispatch(
      addCamera({
        camera: {
          id,
          name: data.name,
          filmFormat: data.filmFormat as FilmFormat,
          hasLightMeter: data.hasLightMeter,
          shutterSpeeds: [],
          description: data.description,
          notes: data.notes,
          rolls: [],
          visible: true,
        },
      }),
    );
    await saveState();
    navigate(`/camera/${id}`);
  };

  return (
    <Stack spacing={1} py={1}>
      <BackButton />
      <Alert severity="info">
        <AlertTitle>Camera</AlertTitle>A camera allows you to associate specific
        shots with more metadata.
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextInput control={control} name="name" label="Name" />
          <TextInput control={control} name="description" label="Description" />
          <TextInput control={control} name="filmFormat" label="Film Format" />
          <BooleanInput
            control={control}
            name="hasLightMeter"
            label="Has Light meter"
          />
          <TextInput control={control} name="notes" label="Notes" />
          <SubmitButton>Create Camera</SubmitButton>
        </Stack>
      </form>
    </Stack>
  );
};
