import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { blogsApiHandler } from "./blogs";

const app = express();
const port = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

app.get("/api/blogs", (req, res) => {
  void blogsApiHandler(req, res);
});

app.use(express.static(distDir));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Portfolio server listening on http://localhost:${port}`);
});
