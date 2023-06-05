
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {settings} from "../config/app";

export interface UserPayload {
    user: {
      username: string;
      email: string;
      id: number;
    };
    iat: number;
    exp: number
  }

declare global {
    namespace Express {
      interface Request {
        currentUser: UserPayload;
      }
    }
  }

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    
    const token: string | undefined = req.header("auth-token");
    if (!token) {
        res.status(401);
        throw new Error("User is not Authorized or Token is missing ");
    };

    try {
        const payload = jwt.verify(token, settings.secretKey) as UserPayload;
        req.currentUser = payload;
        
        next();
    } 
    catch (error) {
        console.log(error);
        next(error)
        
    }
};