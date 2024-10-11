import { addStudent, deleteStudent, updateStudent } from "../api/students";

const addStudentMutation = {
  mutationFn: addStudent,
};

const deleteStudentMutation = {
  mutationFn: deleteStudent,
};

const updateStudentMutation = {
  mutationFn: updateStudent,
};

export { addStudentMutation, deleteStudentMutation, updateStudentMutation };
