import { Express } from "express";
import {
  ApolloServer,
  GraphQLUpload,
  mergeSchemas,
} from "apollo-server-express";

import UserSchema from "./schemas/User";
// import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";

export async function createApolloServer(): Promise<ApolloServer> {
  return new ApolloServer({
    schema: mergeSchemas({
      schemas: [UserSchema],
      resolvers: [
        // {
        //   JSON: GraphQLJSON,
        //   //   JSONObject: GraphQLJSONObject,
        //   //   GeoJSONPolygon: GeoJSONPolygon,
        //   Upload: GraphQLUpload,
        // },
      ],
    }),
    // context({ req }: { req: IRequest }): GraphQLContext {
    //   return {
    //     session: req.jwtSession,
    //     data: req.jwtData,
    //   };
    // },
    introspection: true,
    playground: true,
  });
}

export default async function mountApolloServer(app: Express) {
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app, path: `/api/ql` });
}
