import { ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FormikProvider, FormikHelpers, useFormik } from "formik";
import { format, subDays } from "date-fns";
import {
  getLastNightSleep,
  getLast30NightsSleep,
  saveSleep
} from "../../../store/sleep/thunks";
import { useAppDispatch } from "../../../store/hooks";
import {
  FEELING_OPTIONS,
  getDefaultValues,
  SLEEP_LOG_SUCCESS_MESSAGE
} from "./constant";
import {
  ILogSleepInformationFormProperties,
  LogSleepInformationFormFields,
  ILogSleepInformationForm
} from "./types";
import { DateField, RadioButtonField } from "../../Fields";
import { validationSchema } from "./validationSchema";
import { notifySuccess } from "../../../utils";

export function LogSleepInformationForm({
  onClose
}: ILogSleepInformationFormProperties) {
  const dispatch = useAppDispatch();

  const handleSubmitSuccessCallback = (
    actions: FormikHelpers<ILogSleepInformationForm>
  ) => {
    notifySuccess(SLEEP_LOG_SUCCESS_MESSAGE);
    actions.resetForm({ values: getDefaultValues(), isSubmitting: false });
    onClose();
    dispatch(getLastNightSleep());
    dispatch(getLast30NightsSleep());
  };

  const onSubmit = (
    values: ILogSleepInformationForm,
    actions: FormikHelpers<ILogSleepInformationForm>
  ) => {
    dispatch(
      saveSleep({
        sleepData: {
          bedTimeStart: values[LogSleepInformationFormFields.BED_TIME_START],
          bedTimeEnd: values[LogSleepInformationFormFields.BED_TIME_END],
          feeling: Number(values[LogSleepInformationFormFields.FEELING])
        },
        callback: () => handleSubmitSuccessCallback(actions)
      })
    );
  };

  const formik = useFormik<ILogSleepInformationForm>({
    initialValues: getDefaultValues(),
    onSubmit,
    validationSchema
  });

  const { handleSubmit, isSubmitting } = formik;

  const currentDate = new Date();
  const dayBefore = subDays(currentDate, 1);
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd'T'HH:mm");
  const formattedDayBefore = format(dayBefore, "yyyy-MM-dd'T'HH:mm");

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} noValidate>
        <ModalBody display="flex" flexDirection="column" gap={5}>
          <DateField
            name={LogSleepInformationFormFields.BED_TIME_START}
            label="Bedtime start"
            minDate={formattedDayBefore}
            maxDate={formattedCurrentDate}
            disabled={isSubmitting}
          />
          <DateField
            name={LogSleepInformationFormFields.BED_TIME_END}
            label="Bedtime end"
            minDate={formattedCurrentDate}
            maxDate={formattedCurrentDate}
            disabled={isSubmitting}
          />
          <RadioButtonField
            name={LogSleepInformationFormFields.FEELING}
            label="Feeling"
            options={FEELING_OPTIONS}
            disabled={isSubmitting}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" isLoading={isSubmitting} type="submit">
            Save
          </Button>
        </ModalFooter>
      </form>
    </FormikProvider>
  );
}
