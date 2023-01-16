import * as Yup from "yup";

export const partnersFormValidation = Yup.object().shape({
  name: Yup.string().required(),
  contactEmail: Yup.string().required().email(),
  contactPersonName: Yup.string().required(),
  targetRegions: Yup.array().min(1).required(),
});
