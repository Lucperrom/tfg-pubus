import { formValidators } from "../../../validators/formValidators";

export const registerFormResearcherInputs = [
  {
    tag: "Address",
    name: "address",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Telephone",
    name: "telephone",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator, formValidators.telephoneValidator],
  },
];
