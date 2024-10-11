import * as Yup from "yup";

export const addStudentSchema = Yup.object({
  name: Yup.string().required("Required"),
  registrationNumber: Yup.string().required("Required"),
  major: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  gpa: Yup.number().required("Required"),
});
export const editStudentSchema = Yup.object({
  id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  registrationNumber: Yup.string().required("Required"),
  major: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  gpa: Yup.number().required("Required"),
});
