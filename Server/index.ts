import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
import { modelRouter } from "./routes/model";
import { rateLimit } from "express-rate-limit";

export const app = express();
const rate_limiter = rateLimit({
  max: 800,
  windowMs: 60 * 60 * 1000,
  message:
    "We have received too many requests from this IP, Please try again after an hour",
});
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* FILE UPLOAD */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

/* MIDDLEWARE */
app.use("/api", rate_limiter);

/* ROUTES */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/model", modelRouter);

/* SERVER SETUP */


export default app;
