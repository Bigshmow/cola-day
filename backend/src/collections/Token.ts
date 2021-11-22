import { model, Schema as _Schema, Document } from "mongoose";
import * as jwt from "jsonwebtoken";

import { jwtSecret } from "../config";

const day = 1000 * 60 * 60 * 24;

const Schema = new _Schema({
  expire: {
    type: Date,
    default: () => Date.now() + day,
    index: { expires: 0 },
  },
  from: { type: String, default: "general" },
  user: { type: _Schema.Types.ObjectId, ref: "User" },
});

Schema.methods = {
  getToken() {
    return jwt.sign({ token: this._id.toString() }, jwtSecret);
  },
};

export function parseToken(rawToken) {
  return jwt.verify(rawToken, jwtSecret);
}

export default model<Document & any>("Token", Schema);
