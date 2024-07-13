import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio
} from "@chakra-ui/react";
import { useField } from "formik";
import { IRadioButtonFieldProperties } from "./types";

export function RadioButtonField({
  label,
  name,
  options,
  disabled = false
}: IRadioButtonFieldProperties) {
  const [{ value }, { error, touched }, { setValue, setTouched }] =
    useField<string>(name);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isInvalid = Boolean(error && touched);
  const errorMessage = isInvalid ? error : "";

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        defaultValue={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <HStack spacing="24px">
          {options.map(({ optionValue, optionLabel }) => (
            <Radio key={optionLabel} value={optionValue} disabled={disabled}>
              {optionLabel}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
