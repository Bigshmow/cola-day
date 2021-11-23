import { Request } from "express";
import { Document } from "mongoose";
import Token, { parseToken } from "../collections/Token";
import * as jwt from "jsonwebtoken";

export interface IRequest extends Request {
  jwtSession: Document & { user: string };
}

export const jwtSessionMiddleware = async (req: any, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [type, token] = authHeader.split(" ");
    if (type === "Bearer") {
      try {
        const data: any = parseToken(token);
        req.jwtSession = await Token.findById(data.token);
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          console.log("expired jwt", error);
          return next();
        } else if (error instanceof jwt.JsonWebTokenError) {
          console.log("login jwt", error);
          return next();
        } else {
          return next(error);
        }
      }
    }
  }
  next();
};
