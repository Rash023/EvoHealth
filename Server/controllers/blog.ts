import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import { createBlogInput, updateBlogInput } from '@rash023/narrify';

const router = express.Router();
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
    res.status(403).json({ error: 'Unauthorized, invalid token' });
  }
};

export const createBlogPost = async (req: any, res: any) => {
  const body = req.body;
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }
  const authorId = req.userId;
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
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
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ message: 'Inputs not correct' });
  }
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
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
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
