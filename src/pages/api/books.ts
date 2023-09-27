import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Book } from "@/types/book";

type ResponseData = Book[];
type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorResponse>
) {
  try {
    // Path to the books.json file
    const filePath = path.join(process.cwd(), "src/pages/data", "books.json");

    // Read the file synchronously
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse the JSON data
    const data: ResponseData = JSON.parse(fileContents);

    // Return the parsed data
    res.status(200).json(data);
  } catch (error) {
    // Handle any errors (e.g., file not found, JSON parse error, etc.)
    console.error(error);
    res.status(500).json({ error: "Failed to read books data" });
  }
}
