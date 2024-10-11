import { AxiosResponse } from "axios";
export interface ApiResponse<T> {
  config: object;
  data: T;
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

export type Response<T> = AxiosResponse<ApiResponse<T>>;

export type Student = {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
};

export type AddStudentOptions = {
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
};
export type UpdateStudentOptions = {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
};