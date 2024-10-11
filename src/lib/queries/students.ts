import { Student } from "@/utils/types";
import { getStudent, getStudents } from "../api/students";
import { queryKeys } from "../tanstack-query/query-keys";

const getStudentsQuery = (search?: string, initialData?: Student[]) => {
  return {
    queryKey: queryKeys.students(search),
    queryFn: () => getStudents({ search }),
    initialData: { data: initialData },
    staleTime: 0,
  };
};

const getStudentQuery = (id: string, initialData?: Student) => {
  return {
    queryKey: queryKeys.student(id),
    queryFn: () => getStudent(id),
    retry: 3,
    initialData,
  };
};

export { getStudentsQuery, getStudentQuery };
