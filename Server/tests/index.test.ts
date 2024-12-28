import { describe,it,expect ,vi} from "vitest";
import request from "supertest";
import {app} from "../index"
import { prisma } from "../utils/__mocks__/db";
import jwt from "jsonwebtoken";



//mocking the db calls
vi.mock('../utils/db')


//mocking the middleware
vi.mock('../middlewares/authMiddleware', () => ({
    authMiddleware: (req: any, res: any, next: any) => {
      req.userId = "1";
      next();
    },
  }));



  describe("POST /api/v1/user/signup", () => {
    it("should register user with valid input", async () => {
      prisma.user.create.mockResolvedValue({
        id: "1",
        email: "johndoe@gmail.com",
        name: "John Doe",
        password: "12345",
      });
  
      const res = await request(app).post("/api/v1/user/signup").send({
        email: "johndoe@gmail.com",
        password: "12345",
        name: "John Doe",
      });
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User Registered!");
      
    });
  
    it("should fail on invalid email", async () => {
      const res = await request(app).post("/api/v1/user/signup").send({
        email: "invalid-email",
        password: "12345",
        name: "John Doe",
      });
  
      expect(res.status).toBe(411);
      expect(res.body.message).toBe("Invalid input");
    });
  
    it("should fail on short password", async () => {
      const res = await request(app).post("/api/v1/user/signup").send({
        email: "johndoe@gmail.com",
        password: "123",
        name: "John Doe",
      });
  
      expect(res.status).toBe(411);
      expect(res.body.message).toBe("Invalid input");
    });

  });
  
  // Sign-In Tests
  describe("POST /api/v1/user/signin", () => {
    it("should login user with valid credentials", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: "1",
        email: "johndoe@gmail.com",
        name: "John Doe",
        password: "12345",
      });
  
      const res = await request(app).post("/api/v1/user/signin").send({
        email: "johndoe@gmail.com",
        password: "12345",
      });
  
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User logged in Successfully!");
    });
  
    it("should fail on invalid email", async () => {
      const res = await request(app).post("/api/v1/user/signin").send({
        email: "invalid-email",
        password: "12345",
      });
  
      expect(res.status).toBe(411);
      expect(res.body.message).toBe("Invalid input");
    });

  });



// CREATE BLOG POST
describe("POST /api/v1/blog/create", () => {
    it("should create a blog successfully", async () => {
      prisma.post.create.mockResolvedValue({
        id:"1",
        title:"Test blog",
        description:"This is a test blog",
        domain:"Testing",
        content:"Hello there, making sure everything works!",
        tag:"Test",
        published:true,
        authorId:"1"
      });

      const res = await request(app).post("/api/v1/blog/create")
        .set('Authorization', 'Bearer token')
        .set('Content-Type', 'application/json')
        .send({
          title: "Test blog",
          description: "This is a test blog",
          domain: "Testing",
          content: "Hello there, making sure everything works!",
          tag: "Test",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Blog Posted Successfully!");
      expect(res.body.id).toBe("1");
    });

    it("should return validation error for invalid input", async () => {
      const res = await request(app).post("/api/v1/blog/create")
        .set('Authorization', 'Bearer token')
        .set('Content-Type', 'application/json')
        .send({
          title: "",
          description: "",
        });

      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Invalid input");
    });
  });

  // UPDATE BLOG POST
  describe("POST /api/v1/blog/update", () => {
    it("should update a blog successfully", async () => {
      prisma.post.update.mockResolvedValue({
        id:"1",
        title:"Test blog",
        description:"This is a test blog",
        domain:"Testing",
        content:"Hello there, making sure everything works!",
        tag:"Test",
        published:true,
        authorId:"1"
      });

      const res = await request(app).post("/api/v1/blog/update")
        .set('Authorization', 'Bearer token')
        .set('Content-Type', 'application/json')
        .send({
          id: "1",
          title: "Updated Title",
          content: "Updated Content"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Blog updated successfully");
      expect(res.body.id).toBe("1");
    });

    it("should return validation error for invalid input", async () => {
      const res = await request(app).post("/api/v1/blog/update")
        .set('Authorization', 'Bearer token')
        .set('Content-Type', 'application/json')
        .send({
          title: "Updated Title"
        });

      expect(res.statusCode).toBe(411);
      expect(res.body.message).toBe("Invalid input");
    });
  });



  // FEED BY TAGS
  describe("GET /api/v1/blog/feedByTags", () => {
    it("should return blogs by tags", async () => {
        prisma.post.findMany.mockResolvedValue([
            {
              id: "1",
              title: "Test blog 1",
              description: "This is the first test blog",
              domain: "Testing",
              content: "Hello there, first blog post.",
              tag: "Test",
              published: true,
              authorId: "1",
            }
          ]);
    
        const res = await request(app).get("/api/v1/blog/feedByTags").send({
            tags:["Test"]
        })

    
        expect(res.body.blogs[0].tag).toBe("Test");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Blogs fetched by tags successfully");
    })

    it("should return 400 if no blogs are found", async () => {
      prisma.post.findMany.mockResolvedValue([]);

      const res = await request(app).post("/api/v1/blog/feedByTags")
        .send({ tags: ["InvalidTag"] });

        console.log(res.body)
      expect(res.statusCode).toBe(404);
      
    });
  });

  // FEED BY DOMAIN
  describe("GET /api/v1/blog/feedByDomain", () => {
    it("should return blogs by domain", async () => {
      prisma.post.findMany.mockResolvedValue([
        {
            id: "1",
            title: "Test blog 1",
            description: "This is the first test blog",
            domain: "Testing",
            content: "Hello there, first blog post.",
            tag: "Test",
            published: true,
            authorId: "1",
        },
      ]);

      const res = await request(app).get("/api/v1/blog/feedByDomain")
        .send({ domain: "Testing" });

      expect(res.statusCode).toBe(200);
      expect(res.body.blogs).toHaveLength(1);
      expect(res.body.blogs[0].domain).toBe("Testing");
    });

    it("should return 400 if no blogs are found", async () => {
      prisma.post.findMany.mockResolvedValue([]);

      const res = await request(app).get("/api/v1/blog/feedByDomain")
        .send({ domain: "InvalidDomain" });

      expect(res.statusCode).toBe(400);
      expect(res.body).toBe("No blogs found with this domain");
    });
  });








