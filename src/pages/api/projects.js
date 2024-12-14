import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  const jsonDirectory = path.join(process.cwd(), "src", "app", "project");
  const fileContents = await fs.readFile(
    jsonDirectory + "/projects.json",
    "utf8"
  );
  res.status(200).json(JSON.parse(fileContents));
}
