"use client";
import Button from "@/components/global/button";
import { queryKeys } from "@/lib/tanstack-query/query-keys";
import { useAddStudentMutation } from "@/lib/tanstack-query/students";
import { AddStudentOptions } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { addStudentSchema } from "@/utils/form-validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/global/input";
import { useRouter } from "next/navigation";

const NewStudent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddStudentOptions>({
    resolver: yupResolver(addStudentSchema),
    mode: "all",
  });

  const qc = useQueryClient();

  const { mutate, isPending } = useAddStudentMutation();

  const submit = async (id: AddStudentOptions) => {
    try {
      await mutate(id);
      toast.success("Student Added Successfully");
      await qc.invalidateQueries({
        queryKey: queryKeys.students(""),
      });
      reset()
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

  return (
    <div
      className={`min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Add Students</h1>
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
          Add Student
        </Button>
      </form>
    </div>
  );
};

export default NewStudent;
