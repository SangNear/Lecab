import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ;

console.log("TEST ENV:", );
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});