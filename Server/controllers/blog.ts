import express, { Request, Response } from 'express';
import {prisma } from "../utils/db";
import jwt from "jsonwebtoken";
import {z} from "zod";

//zod schemas

const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(20),
  description: z.string().min(1, "Description is required").max(50),
  domain: z.string().max(10),
  tag: z.string().max(10),
  content: z.string().min(1, "Content is required").max(500),
});
 
const updateBlogPostSchema = z.object({
  id: z.string(),
  title: z.string().max(20).optional(),
  content: z.string().max(500).optional(),
});


const getBlogByIdSchema = z.object({
  id: z.string(),
});

const feedByTagsSchema = z.object({
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
});

const feedByDomainSchema = z.object({
  domain: z.string().min(1, "Domain is required"),
});

export const createBlogPost = async (req: any, res: any) => {
  const parsedReq = createBlogPostSchema.safeParse(req.body);
  const authorId = req.userId;
  if(!parsedReq.success){
    return res.status(411).json({message:"Invalid input"})
  }
  try {
    const blog = await prisma.post.create({
      data: {
        title: parsedReq.data.title,
        description :parsedReq.data.description,
        domain: parsedReq.data.domain,
        tag:parsedReq.data.tag,
        content: parsedReq.data.content,
        authorId,
      },
    });
    return res.status(200).json({ id: blog.id , message:"Blog Posted Successfully!"});
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
  }
};

export const updateBlogPost = async (req: any, res: any) => {
  const parsedReq = updateBlogPostSchema.safeParse(req.body);

  if(!parsedReq.success){
    return res.status(411).json({message:"Invalid input"})
  }
  
  try {
    const blog = await prisma.post.update({
      where: { id: parsedReq.data.id },
      data: {
        title: parsedReq.data.title,
        content: parsedReq.data.content,  
      },
    });
    return res.status(200).json({ id: blog.id,message:"Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Error updating blog post' });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        description:true,
        tag:true,
        domain:true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.json({ blogs });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const parsedReq = getBlogByIdSchema.safeParse(req.params);
  if (!parsedReq.success) {
    return res.status(411).json({ message: 'Invalid ID' });
  }
  try {
    const blog = await prisma.post.findFirst({
      where: { id: parsedReq.data.id },
      select: {
        content: true,
        title: true,
        description: true,
        tag: true,
        domain: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ blog:blog ,message:"Blog fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post' });
  }
};

export const feedbyTags = async (req: any, res: any) => {
  const parsedReq = feedByTagsSchema.safeParse(req.body);
  if (!parsedReq.success) {
    return res.status(411).json({ message: 'Invalid input' });
  }
  try {
    const blogs = await prisma.post.findMany({
      where: {
        tag: {
          in: parsedReq.data.tags,
          not: '',
        },
      },
      select: {
        content: true,
        title: true,
        description: true,
        tag: true,
        domain: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blogs.length) {
      return res.status(404).json({message:'No blogs found with these tags'});
    }
    return res.status(200).json({ blogs,message:"Blogs fetched by tags successfully" });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const feedbyDomain = async (req: any, res: any) => {
  const parsedReq = feedByDomainSchema.safeParse(req.body);
  if (!parsedReq.success) {
    return res.status(411).json({ message: 'Invalid input' });
  }
  try {
    const blogs = await prisma.post.findMany({
      where: { domain: parsedReq.data.domain },
      select: {
        content: true,
        title: true,
        description: true,
        tag: true,
        domain: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blogs.length) {
      return res.status(400).json('No blogs found with this domain');
    }
    return res.status(200).json({ blogs,message:"Blogs fetched successfully" });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
