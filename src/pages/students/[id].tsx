"use client";
import Button from "@/components/global/button";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import { useUpdateStudentMutation } from "@/lib/tanstack-query/students";
import { Student, UpdateStudentOptions } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { editStudentSchema } from "@/utils/form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/global/input";
import { useRouter } from "next/navigation";
import { GetStaticPaths, GetStaticProps } from "next";

interface StudentPageProps {
  data: { student: Student };
}

const EditStudent = ({ data }: StudentPageProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateStudentOptions>({
    resolver: yupResolver(editStudentSchema),
    mode: "all",
    defaultValues: {
      id: data.student.id,
      name: data.student.name,
      registrationNumber: data.student.registrationNumber,
      major: data.student.major,
      dob: data.student.dob,
      gpa: data.student.gpa,
    },
  });

  const qc = useQueryClient();

  const { mutate, isPending } = useUpdateStudentMutation();

  const submit = async (student: UpdateStudentOptions) => {
    try {
      await mutate(student);
      toast.success("Student edited Successfully");
      await qc.invalidateQueries({
        queryKey: queryKeys.students(""),
      });
      reset();
      router.push("/students");
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

  if (!data) {
    return <div>Student not found</div>;
  }

  return (
    <div
      className={`min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-center text-xl mb-5 font-bold">Edit Students</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            title="Name"
            name="name"
            placeholder="Chimdia Anyiam"
            register={register("name")}
            error={errors?.name?.message}
          />
          <Input
            type="text"
            title="Registration Number"
            name="registrationNumber"
            placeholder="2013/343454"
            register={register("registrationNumber")}
            error={errors?.registrationNumber?.message}
          />
          <Input
            type="text"
            title="Major"
            name="major"
            placeholder="Computer Science"
            register={register("major")}
            error={errors?.major?.message}
          />
          <Input
            type="text"
            title="Date of Birth"
            name="dob"
            placeholder="12/12/1990"
            register={register("dob")}
            error={errors?.dob?.message}
          />
          <Input
            type="text"
            title="GPA"
            name="gpa"
            placeholder="3.5"
            register={register("gpa")}
            error={errors?.gpa?.message}
          />
        </div>

        <Button type="submit" loading={isPending} className="mt-8" full>
          Edit Student
        </Button>
      </form>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/students`);
  const students = await res.json();
  const paths = students.data.map((student: Student) => ({
    params: { id: student.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/students/${id}`);
  const student = await res.json();

  if (!student) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: student,
    },
  };
};

export default EditStudent;
