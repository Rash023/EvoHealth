const express=require('express');
const blogRouter=express.Router();

import {createBlogPost,updateBlogPost,getAllBlogs,getBlogById,feedbyTags,feedbyDomain} from "../controllers/blog";
import {authMiddleware} from "../middlewares/authMiddleware"



blogRouter.post("/create",authMiddleware,createBlogPost);
blogRouter.post("/update",authMiddleware,updateBlogPost);
blogRouter.get("/feed",getAllBlogs);
blogRouter.get("/read",getBlogById);
blogRouter.get("/feedByTags",feedbyTags);
blogRouter.get("/feedByDomain",feedbyDomain);

export {blogRouter};