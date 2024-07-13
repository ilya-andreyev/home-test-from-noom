import { IOption } from "../../../types";

export interface IRadioButtonFieldProperties {
  label: string;
  name: string;
  options: IOption[];
  disabled?: boolean;
}
