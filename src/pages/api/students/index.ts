import Redis from "ioredis";
import { Student } from "@/utils/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid"; // for generating unique IDs

type Data = {
  data?: Student[];
  message?: string;
};

// Initialize Redis connection using environment variables
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set");
}
const redis = new Redis(redisUrl); // Assumes you have a Redis URL in your environment variables

// Utility function to get students from Redis
const getStudents = async (): Promise<Student[]> => {
  const students = await redis.get("students");
  return students ? JSON.parse(students) : [];
};

// Utility function to save students to Redis
const saveStudents = async (students: Student[]): Promise<void> => {
  await redis.set("students", JSON.stringify(students));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const { q } = req.query;

  switch (method) {
    case "GET":
      try {
        let students = await getStudents();

        // If search query parameters are provided, filter the students
        if (q) {
          students = students.filter((student) => {
            return (
              (q
                ? student.name
                    .toLowerCase()
                    .includes((q as string).toLowerCase())
                : true) ||
              (q
                ? student.major
                    .toLowerCase()
                    .includes((q as string).toLowerCase())
                : true) ||
              (q
                ? student.registrationNumber
                    .toLowerCase()
                    .includes((q as string).toLowerCase())
                : true)
            );
          });
        }

        return res.status(200).json({ data: students });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return res.status(500).json({ message: "Failed to fetch students" });
      }

    case "POST":
      try {
        const { name, registrationNumber, major, dob, gpa } = req.body;

        if (!name || !registrationNumber || !major || !dob || !gpa) {
          return res
            .status(400)
            .json({ message: "Missing student information" });
        }

        const students = await getStudents();

        const newStudent: Student = {
          id: uuidv4(), // Generate a unique ID using uuid
          name,
          registrationNumber,
          major,
          dob,
          gpa,
        };

        students.push(newStudent);

        await saveStudents(students);

        return res.status(201).json({ data: students });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return res.status(500).json({ message: "Failed to add student" });
      }

    default:
      // If the method is not allowed, return a 405 error
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
