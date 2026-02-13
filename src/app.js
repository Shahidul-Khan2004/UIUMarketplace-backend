import "dotenv/config";
import express from "express";
import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/", healthRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
