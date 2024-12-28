import {prisma } from "../utils/db";
const jwt = require("jsonwebtoken");
import {z} from "zod";


//zod schemas
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});


export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 6 characters long"),
});

export const signup = async (req: any, res: any) => {
  const {email,password,name}=req.body;
  
  if (!SignupSchema.safeParse(req.body).success) {
    return res.status(411).json({ message: 'Invalid input' });
  }

  try {
    const user = await prisma.user.create({
      data: { email,password,name },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({token:token,message:"User Registered!"});
  } catch (error) {
    console.log(error)
    return res.status(500).send("Invalid");
  }
};

export const signin = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!SigninSchema.safeParse(req.body).success) {
    return res.status(411).json({ message: 'Invalid input' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({
      token:token, message:"User logged in Successfully!"
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error"});
  }
};
