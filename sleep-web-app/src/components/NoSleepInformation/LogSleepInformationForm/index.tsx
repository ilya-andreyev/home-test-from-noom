import { ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FormikProvider, FormikHelpers, useFormik } from "formik";
import { format } from "date-fns";
import { getLastNightSleep, saveSleep } from "../../../store/sleep/thunks";
import { useAppDispatch } from "../../../store/hooks";
import {
  FEELING_OPTIONS,
  initialValues,
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
    actions.resetForm({ values: initialValues, isSubmitting: false });
    onClose();
    dispatch(getLastNightSleep());
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
    initialValues,
    onSubmit,
    validationSchema
  });

  const { handleSubmit, isSubmitting, values } = formik;

  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");
  const maxBedTimeStartDate =
    values[LogSleepInformationFormFields.BED_TIME_END] || currentDate;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} noValidate>
        <ModalBody display="flex" flexDirection="column" gap={5}>
          <DateField
            name={LogSleepInformationFormFields.BED_TIME_START}
            label="Bedtime start"
            maxDate={maxBedTimeStartDate}
            disabled={isSubmitting}
          />
          <DateField
            name={LogSleepInformationFormFields.BED_TIME_END}
            label="Bedtime end"
            minDate={values[LogSleepInformationFormFields.BED_TIME_START]}
            maxDate={currentDate}
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
