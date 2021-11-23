import { Document, model, Schema as _Schema } from "mongoose";
import { hashSync, compareSync } from "bcrypt";
import Organization from "./Organization";

const Schema = new _Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, index: { unique: true } },
    password: { type: String },
    organization: { type: _Schema.Types.ObjectId, ref: "Organization" },
  },
  {
    timestamps: true,
  }
);

Schema.methods = {
  setPassword(password: string) {
    this.set("password", hashSync(password, 10));
  },
  verifyPassword(password: string) {
    return compareSync(password, this.get("password"));
  },
  async toJSON_Web() {
    return {
      firstName: this.get("firstName"),
      lastName: this.get("lastName"),
      email: this.get("email"),
      organization: await Organization.findById(this.get("organization")),
      _id: this._id.toString(),
      created_at: (this.get("createdAt") / 1000) | 0,
    };
  },
};

const User = model<Document & any>("User", Schema);
export default User;
