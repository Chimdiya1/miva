"use client";
import Button from "@/components/global/button";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import {
  useDeleteStudentMutation,
  useGetStudents,
} from "@/lib/tanstack-query/students";
import { Student } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Define the props type for your component
interface StudentPageProps {
  students: Student[];
}
const Students: React.FC<StudentPageProps> = ({ students }) => {
  const qc = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const {
    data: allStudentsData,
    isLoading: isStudentsLoading,
    isFetching,
  } = useGetStudents(searchValue, students);
  const { mutate, isPending } = useDeleteStudentMutation();

  const handleDeleteStudent = async (id: string) => {
    try {
      await mutate(id);
      toast.success("Student Deleted Successfully");
      await qc.invalidateQueries({
        queryKey: queryKeys.students(),
      });
      await qc.invalidateQueries();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e?.response?.data?.message ?? "Something went wrong, please try again"
        );
      } else {
        toast.error("An unexpected error has occured");
      }
    }
  };

  return (
    <div
      className={`min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-center text-xl mb-5 font-bold">Miva Students</h1>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for student"
        className="p-2 border rounded-lg mb-2 text-gray-800"
      />
      {isStudentsLoading || isFetching ? (
        <div className="bg-slate animate-pulse h-32 w-full"></div>
      ) : allStudentsData?.data?.length ? (
        <div className="space-y-4">
          {allStudentsData?.data?.map((student) => (
            <div
              key={student.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-sm text-gray-600">
                  Reg No: {student.registrationNumber}
                </p>
                <p className="text-sm text-gray-600">Major: {student.major}</p>
                <p className="text-sm text-gray-600">DOB: {student.dob}</p>
                <p className="text-sm text-gray-600">GPA: {student.gpa}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/students/${student.id}`}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <Button
                  onClick={() => handleDeleteStudent(student.id)}
                  loading={isPending}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{searchValue ? "No Result" : "No student added"}</p>
      )}
      <Link
        className="mt-4 inline-block px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        href="/students/new"
      >
        Add Student
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/students`);

  const students = await res.json();


  return {
    props: {
      students: students.data,
    },
    revalidate: 60,
  };
};
export default Students;
