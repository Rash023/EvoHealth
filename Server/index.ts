import express from 'express';
import { PrismaClient } from '@prisma/client';
import {blogRouter} from "./routes/blog";
import {userRouter} from "./routes/user";
import {rateLimit} from "express-rate-limit";


const app = express();
const prisma = new PrismaClient();
const rate_limiter=rateLimit({
  max:800,
  windowMs: 60*60*1000,
  message:'We have received too many requests from this IP, Please try again after an hour'
});
app.use(express.json());
//middleware for rate limiting
app.use('/api',rate_limiter);
// Set up routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

// Handle server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
