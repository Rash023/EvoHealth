import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const blogAuthMiddleware = async (req: any, res: any, next: any) => {
  try {
    const header = req.headers.authorization?.replace('Bearer ', '') || '';
    if (!header) {
      return res.status(401).json({ error: 'Unauthorized, token missing' });
    }
    const decoded = jwt.verify(header, process.env.JWT_SECRET || '') as { id: string };
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.log(error)
    res.status(403).json({ error: 'Unauthorized, invalid token' });
  }
};

export const createBlogPost = async (req: any, res: any) => {
  const body = req.body;
  const authorId = req.userId;
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        description :body.description,
        domain: body.domain,
        tag:body.tag,
        content: body.content,
        authorId,
      },
    });
    return res.status(200).json({ id: blog.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post' });
  }
};

export const updateBlogPost = async (req: any, res: any) => {
  const body = req.body;
  
  try {
    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return res.json({ id: blog.id });
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
  const { id } = req.params;
  try {
    const blog = await prisma.post.findFirst({
      where: { id:id },
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
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post' });
  }
};


export const feedbyTags=async(req: any, res: any)=>{
  const {tags}=req.body;
    try{
      const blogs=await prisma.post.findMany({
        where:{tag:{
            in:tags,
            not:""
          }
        },
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
      })

      if(!blogs){
        return res.status(400).json("No blogs found with this id");
      }

      return res.status(200).json({blogs});
    }
    catch(error){
      return res.status(500).json({message:"Internal Server Error"})
    }

}


export const feedbyDomain=async(req: any, res: any)=>{
  const {domain}=req.body;
    try{
      const blogs=await prisma.post.findMany({
        where:{domain:domain},
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
      })

      if(!blogs){
        return res.status(400).json("No blogs found with this domain");
      }

      return res.status(200).json({blogs});
    }
    catch(error){
      return res.status(500).json({message:"Internal Server Error"})
    }

}