import Redis from "ioredis";
import { Student } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  student?: Student;
  message?: string;
};

// Initialize Redis connection
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}
const redis = new Redis(redisUrl); // Assumes you have a Redis URL set in your environment variables

// Utility functions for Redis
const getStudents = async (): Promise<Student[]> => {
  const students = await redis.get("students");
  return students ? JSON.parse(students) : [];
};

const updateStudents = async (students: Student[]): Promise<void> => {
  await redis.set("students", JSON.stringify(students));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Fetch the latest students data from Redis
  const students = await getStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  switch (method) {
    case "GET":
      // Get a single student by ID
      return res.status(200).json({ student });

    case "PUT":
      // Edit a student by ID
      const updatedStudent = { ...student, ...req.body };
      const updatedStudents = students.map((s) => (s.id === id ? updatedStudent : s));
      await updateStudents(updatedStudents); // Update students in Redis
      return res.status(200).json({ student: updatedStudent });

    case "DELETE":
      // Delete a student by ID
      const remainingStudents = students.filter((s) => s.id !== id);
      await updateStudents(remainingStudents); // Update students in Redis
      return res.status(200).json({ student });

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
