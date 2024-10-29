const express=require('express');
const userRouter=express.Router();
import {signin,signup} from "../controllers/auth";

userRouter.post("/sigin",signin);
userRouter.post("/signup",signup);


export {userRouter};
