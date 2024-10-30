const express=require('express');
const userRouter=express.Router();
import {signin,signup} from "../controllers/auth";

userRouter.post("/signin",signin);
userRouter.post("/signup",signup);


export {userRouter};
