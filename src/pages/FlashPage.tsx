import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { NumericInput } from "../components/NumericInput";
import { TextInput } from "../components/TextInput";
import { useZodForm } from "../hooks/zod";

type FormInputs = {
  guideNumber: string;
  iso: string;
  flashPower: string;
  unit: "ft" | "m";
};

const defaultValues: FormInputs = {
  guideNumber: "66",
  iso: "400",
  flashPower: "1",
  unit: "ft",
};

const schema = z.object({
  guideNumber: z.string(),
  iso: z.string(),
  flashPower: z.string(),
  unit: z.string(),
});

export const FlashPage: FC = () => {
  const [guideNumber, setGuideNumber] = useState<number>(
    Number(defaultValues.guideNumber),
  );
  const [multiplier, setMultiplier] = useState<number>(
    calculateMultiplier({
      iso: defaultValues.iso,
      flashPower: defaultValues.flashPower,
    }),
  );
  const { handleSubmit, control, watch } = useZodForm(
    {
      defaultValues,
    },
    schema,
  );
  const onSubmit: SubmitHandler<FormInputs> = ({
    iso,
    flashPower,
    guideNumber,
  }) => {
    setMultiplier(calculateMultiplier({ iso, flashPower }));
    setGuideNumber(parseInt(guideNumber));
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => {
      subscription.unsubscribe();
    };
  }, [handleSubmit, watch]);

  return (
    <Stack spacing={1}>
      <Alert severity="info">
        Manual flash calculates distance for you. Given input, check the table
        for correct exposure.
      </Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Typography>Settings</Typography>
              <Typography
                sx={{ color: "text.secondary" }}
              >{`GN(${watch("guideNumber")}) / ISO(${watch("iso")}) / FP(${watch("flashPower")})`}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextInput
                  control={control}
                  name="guideNumber"
                  label="Guide Number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput control={control} name="unit" label="Unit" />
              </Grid>
              <Grid item xs={12}>
                <TextInput control={control} name="iso" label="ISO" />
              </Grid>
              <Grid item xs={12}>
                <NumericInput
                  control={control}
                  name="flashPower"
                  label="Flash Power"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>F-Stop</TableCell>
              <TableCell>{`Distance (${watch("unit")})`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1.8, 2.8, 4, 5.6, 8, 11, 16, 22].map((fstop) => {
              return (
                <TableRow key={fstop}>
                  <TableCell>{fstop}</TableCell>
                  <TableCell>
                    {Math.round(((multiplier * guideNumber) / fstop) * 100) /
                      100}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

function calculateMultiplier({
  iso,
  flashPower,
}: {
  iso: string;
  flashPower: string;
}): number {
  return (parseInt(iso) / 100) * parseFloat(flashPower);
}
