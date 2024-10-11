import { useMutation, useQuery } from "@tanstack/react-query";
import { getStudentQuery, getStudentsQuery } from "../queries/students";
import { Student } from "@/utils/types";
import {
  addStudentMutation,
  deleteStudentMutation,
  updateStudentMutation,
} from "../mutations/students";

export const useGetStudents = (search: string, initialData?: Student[]) => {
  return useQuery(getStudentsQuery(search, initialData));
};

export const useGetStudent = (id: string, initialData?: Student) => {
  return useQuery(getStudentQuery(id, initialData));
};

export const useAddStudentMutation = () => {
  return useMutation(addStudentMutation);
};

export const useUpdateStudentMutation = () => {
  return useMutation(updateStudentMutation);
};

export const useDeleteStudentMutation = () => {
  return useMutation(deleteStudentMutation);
};
