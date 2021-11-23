import { Router, Response, RequestHandler } from "express";
import { IRequest } from "../../middlewares/jwt";

import User from "../../collections/User";
import Token from "../../collections/Token";

export const Auth = Router();

import * as errors from "../../errors";

Auth.get(
  "/session",
  wrap(async (req, res) => {
    if (req.jwtSession) {
      const user = await User.findById(req.jwtSession.get("user"));
      res.json(user && (await (user as any).toJSON_Web()));
    } else {
      res.json(null);
    }
  })
);

Auth.delete("/logout", async (req: IRequest, res, next) => {
  await req.jwtSession.remove();
  res.json(null);
});

Auth.post(
  "/login",
  wrap(async (req, res) => {
    let user = null;
    const { email, password } = req.body;
    user = await User.findOne({ email });

    if (!user) {
      throw errors.Auth.userNotExists();
    }

    if (!user.verifyPassword(password)) {
      throw errors.Auth.passwordNotMatch();
    }

    const tokenDB: any = await Token.create({ user: user._id });
    const token = tokenDB.getToken();
    res.json({ user: await user.toJSON_Web(), token });
  })
);

// Helpers
function wrap(fn: (req: IRequest, res: Response) => void): RequestHandler {
  return async function (req, res, next) {
    try {
      await fn(<any>req, res);
    } catch (error) {
      next(error);
    }
  };
}
