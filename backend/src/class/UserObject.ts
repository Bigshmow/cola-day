import { Document } from "mongoose";
import User from "../collections/User";

/*
 * @class
 * */
export class UserObject {
  userId: string;
  user: Document;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Creates a new UserObject from the ID of a previously stored user in MongoDB
   * @param userId
   */
  static async createUserObject(userId: string): Promise<UserObject> {
    const userObject = new UserObject(userId);
    userObject.user = await userObject.getUserStoredInfo(userId);
    return userObject;
  }

  /**
   * Returns the entire User doc for this UserObject from MongoDB
   */
  getUserStoredInfo(userId): Promise<Document> {
    return User.findById(userId) as any;
  }

  /**
   * Returns the OID for this User as a string
   */
  getUserOrganization(): string {
    return this.user.get("organization");
  }
}
