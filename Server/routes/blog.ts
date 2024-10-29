const express=require('express');
const blogRouter=express.Router();

import {createBlogPost,updateBlogPost,getAllBlogs,getBlogById,blogAuthMiddleware} from "../controllers/blog";



blogRouter.post("/create",blogAuthMiddleware,createBlogPost);
blogRouter.post("/update",blogAuthMiddleware,updateBlogPost);
blogRouter.get("/feed",getAllBlogs);
blogRouter.get("/read",getBlogById);

export {blogRouter};