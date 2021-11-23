import { Document } from "mongoose";

export interface GraphQLContext {
  session: Document & { user: string };
}

export interface GraphQLDataSources {}
