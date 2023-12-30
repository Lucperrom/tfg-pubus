import { formValidators } from "../../../validators/formValidators";
import { registerFormClinicresearcherInputs } from "./registerFormClinicresearcherInputs";

export const registerFormGroupInputs = [
  ...registerFormClinicresearcherInputs,
  {
    tag: "City",
    name: "city",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Clinic",
    name: "clinic",
    type: "select",
    values: ["None"],
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator, formValidators.notNoneTypeValidator],
  },
];
