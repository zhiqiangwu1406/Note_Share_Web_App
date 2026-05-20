import express, { json } from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./db/index";
import noteRouter from "./routes/noteRouter";
import cors from "cors";
import userRouter from "./routes/userRouter";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
configDotenv({
  path: ".env",
});
const app = express();
const PORT = process.env.PORT || "3000";
app.use(
  cors({
    origin: [
      process.env.API,
      process.env.LOCAL_API,
      process.env.CUSTOM_DOMAIN,
    ] as string[],
    credentials: true,
  }),
);
app.use(json());
app.use(cookieParser());

app.use(userRouter);
app.use(noteRouter);
app.use(errorHandler);
app.listen(PORT, async () => {
  await connectDB();
  console.log("Server is running on " + PORT);
});
