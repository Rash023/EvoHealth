const express=require('express');
const blogRouter=express.Router();

import {createBlogPost,updateBlogPost,getAllBlogs,getBlogById,blogAuthMiddleware,feedbyTags,feedbyDomain} from "../controllers/blog";



blogRouter.post("/create",blogAuthMiddleware,createBlogPost);
blogRouter.post("/update",blogAuthMiddleware,updateBlogPost);
blogRouter.get("/feed",getAllBlogs);
blogRouter.get("/read",getBlogById);
blogRouter.get("/feedByTags",feedbyTags);
blogRouter.get("/feedByDomain",feedbyDomain);

export {blogRouter};