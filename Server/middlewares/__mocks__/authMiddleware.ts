import {vi} from "vitest";

export const authMiddleware = vi.fn((req: any, res: any, next: any) => {
    // Simulate a valid authenticated user
    req.userId = '1';
    next();
  });
  