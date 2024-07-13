import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { useField } from "formik";
import { IDateFieldProperties } from "./types";

export function DateField({
  label,
  name,
  maxDate,
  minDate,
  disabled = false
}: IDateFieldProperties) {
  const [{ value, onChange, onBlur }, { error, touched }] =
    useField<string>(name);

  const isInvalid = Boolean(error && touched);
  const errorMessage = isInvalid ? error : "";

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={minDate}
        max={maxDate}
        disabled={disabled}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
