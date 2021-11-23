import { Express } from "express";
import { ApolloServer, mergeSchemas } from "apollo-server-express";
import { GraphQLContext } from "./interfaces";
import { IRequest } from "../middlewares/jwt";

import UserSchema from "./schemas/User";
// import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";

export async function createApolloServer(): Promise<ApolloServer> {
  return new ApolloServer({
    schema: mergeSchemas({
      schemas: [UserSchema],
    }),
    context({ req }: { req: IRequest }): GraphQLContext {
      return {
        session: req.jwtSession,
      };
    },
    introspection: true,
    playground: true,
  });
}

export default async function mountApolloServer(app: Express) {
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app, path: `/api/ql` });
}
