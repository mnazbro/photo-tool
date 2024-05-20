import Alert from "@mui/material/Alert";

import { useState, type FC } from "react";
import { type SubmitHandler } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { addRoll } from "../store/cameraSlice";
import {
  useAppDispatch,
  useAppSelector,
  useSaveState,
  useZodForm,
} from "../hooks";
import { v4 } from "uuid";
import * as z from "zod";
import { CameraId, Iso, RollId } from "../types";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { NumberInput } from "../components/NumberInput";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { setActiveRoll } from "../store/activeSlice";
import { BackButton } from "../components/BackButton";
import { SubmitButton } from "../components/SubmitButton";

type FormInputs = {
  name: string;
  iso: string;
  numberOfFrames: number;
  description: string;
  loadDate: string;
  shotAtIso: string;
  notes: string;
};

const defaultValues = {
  name: "",
  iso: "",
  numberOfFrames: 0,
  description: "",
  loadDate: new Date().toISOString(),
  shotAtIso: "",
  notes: "",
} satisfies FormInputs;

const schema = z.object({
  name: z.string().min(1),
  iso: z.string(),
  numberOfFrames: z.number().positive(),
  description: z.string(),
  loadDate: z.optional(z.string().datetime()),
  shotAtIso: z.string(),
  notes: z.string(),
});

export const NewRollPage: FC = () => {
  const dispatch = useAppDispatch();
  const saveState = useSaveState();
  const { cameraId } = useParams<{ cameraId: CameraId }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const camera = useAppSelector((state) =>
    state.camera.cameras.find((camera) => camera.id === cameraId),
  );
  if (camera == null) {
    // TODO: Handle this better
    throw new Error("Oh no");
  }

  const { handleSubmit, control } = useZodForm<FormInputs>(
    {
      defaultValues,
    },
    schema,
  );
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const rollId: RollId = `roll_${v4()}`;
    dispatch(
      addRoll({
        cameraId: camera.id,
        roll: {
          id: rollId,
          name: data.name,
          iso: data.iso as Iso,
          numberOfFrames: data.numberOfFrames,
          description: data.description === "" ? undefined : data.description,
          format: camera.filmFormat,
          loadDate: data.loadDate,
          shotAtIso: data.shotAtIso,
          notes: data.notes === "" ? undefined : data.notes,
          frames: [],
          visible: true,
        },
      }),
    );
    dispatch(setActiveRoll(rollId));
    await saveState();
    navigate("/");
    enqueueSnackbar({ message: "Added a new roll!", variant: "success" });
  };

  return (
    <Stack spacing={1} py={1}>
      <BackButton />
      <Alert severity="info">
        <AlertTitle>Roll</AlertTitle>
        <Typography color="text.primary">
          A roll of film allows you to track the film inside your camera and
          frames that you take with that camera.
        </Typography>
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <TextInput control={control} name="name" label="Name" required />
          <TextInput control={control} name="iso" label="ISO" required />
          <NumberInput
            control={control}
            name="numberOfFrames"
            label="Number of Frames"
            required
          />
          <TextInput control={control} name="description" label="Description" />
          <TextInput control={control} name="loadDate" label="Load Date" />
          <TextInput control={control} name="shotAtIso" label="Shot at ISO" />
          <TextInput control={control} name="notes" label="Notes" />
          <SubmitButton>Create Roll</SubmitButton>
        </Stack>
      </form>
    </Stack>
  );
};
