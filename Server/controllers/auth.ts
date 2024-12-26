import {prisma } from "../utils/db";
const jwt = require("jsonwebtoken");



export const signup = async (req: any, res: any) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(411).json({ message: 'Invalid input' });
  }

  try {
    const user = await prisma.user.create({
      data: { email, password, name },
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

  if (!email || !password) {
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
