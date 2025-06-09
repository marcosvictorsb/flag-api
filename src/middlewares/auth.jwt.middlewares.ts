import { NextFunction, Request, Response } from "express";
require('dotenv').config();
import jwt from 'jsonwebtoken';



export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = request.header('authorization');
    if (!authHeader) return response.status(401).json({ error: 'No token provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return response.status(401).json({ error: 'Not format valid token' });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return response.status(401).json({ error: 'Token unformatted' });

    jwt.verify(token, process.env.JWT_SECRET_SIGN as string, (error: any, decode: { id: any; }) => {
      if (error) return response.status(401).json({ error: 'Token invalid' });
      (request as any).user = { id: decode.id};
      return next();
    });
  } catch (error) {
    return response.status(500).json({ error: 'Internal error to valid token' });
  }
};

