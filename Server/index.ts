import express from 'express';
import { PrismaClient } from '@prisma/client';
import {blogRouter} from "./routes/blog";
import {userRouter} from "./routes/user";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Set up routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

// Handle server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
