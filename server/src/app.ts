import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute/index.js";
import cors from "cors";
import wordRoute from "./routes/wordRoute/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/word", wordRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});