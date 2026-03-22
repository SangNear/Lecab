import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute/index.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});