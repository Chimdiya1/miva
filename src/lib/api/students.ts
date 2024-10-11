import {
  Student,
  AddStudentOptions,
  UpdateStudentOptions,
} from "@/utils/types";
import http from "../http";

const getStudent = async (id: string) => {
  const res = await http.get<Student>(`/students/${id}`);
  return res.data;
};

const getStudents = async ({ search }: { search?: string }) => {
  const res = await http.get<{ data: Student[] }>("/students", {
    params: { q: search },
  });
  return res.data;
};

const addStudent = (body: AddStudentOptions) => {
  return http.post("/students", body);
};
const updateStudent = (body: UpdateStudentOptions) => {
  return http.put(`/students/${body.id}`, body);
};

const deleteStudent = (id: string) => {
  return http.delete(`/students/${id}`);
};

export { getStudent, getStudents, addStudent, updateStudent, deleteStudent };
