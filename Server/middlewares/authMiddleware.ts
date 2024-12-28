import jwt from "jsonwebtoken";
export const authMiddleware = async (req: any, res: any, next: any) => {
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