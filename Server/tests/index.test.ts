import { describe,it,expect ,vi} from "vitest";
import request from "supertest";
import {app} from "../index"
import { prisma } from "../utils/__mocks__/db";
//mocking the db calls

vi.mock('../utils/db')



describe("POST /api/v1/user/signup",()=>{
    it("User signup service",async()=>{
        prisma.user.create.mockResolvedValue({
            id:"1",
            email:"johndoe@gmail.com",
            name:"john Doe",
            password:"12345",
            
        })


        
        const res=await request(app).post("/api/v1/user/signup").send({
            email:"johndoe@gmail.com",
            password:"12345",
            name:"John Doe"
        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User Registered!")
        

        
    })
})


describe("POST /api/v1/user/signin",()=>{
    it("User signup service",async()=>{
        prisma.user.findUnique.mockResolvedValue({
            id:"1",
            email:"johndoe@gmail.com",
            name:"john Doe",
            password:"12345",
            
        })
        const res=await request(app).post("/api/v1/user/signin").send({
            email:"johndoe@gmail.com",
            password:"12345"

        });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User logged in Successfully!")
        

        
    })
})









