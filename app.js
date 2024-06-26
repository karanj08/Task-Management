import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import connect from "./connection/connection.js";
import cors from "cors";
import UserAPI from "./routes/user.js";
// import User from "./models/user.Schema.js";
import TaskAPI from "./routes/task.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/", (req, res) => {
//   res.send("Hello from backend");
// });
app.use("/api/V1", UserAPI);
app.use("/api/V2", TaskAPI);

console.log(__dirname);
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const port = 1000;

app.listen(port, () => {
  console.log("server started");
});
connect();
