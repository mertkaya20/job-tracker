import * as yup from "yup";

export const applicationSchema = yup.object({
  company_name: yup.string().required("Company name is required"),
  position: yup.string().required("Position is required"),
  status: yup.string().required("Status is required"),
  applied_date: yup.string().required("Applied date is required"),
  notes: yup.string().nullable(),
});
