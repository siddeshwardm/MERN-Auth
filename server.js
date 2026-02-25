import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/Auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "src", ".env") });
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));