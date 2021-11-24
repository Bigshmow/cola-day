import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { typeDefs as globalTypeDefs } from "./typedefs";
import User from "../../collections/User";

const typeDefs = gql`
  type Query {
    getUserById(userId: ID): User
  }

  type Mutation {
    createDevin: User
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  Query: {
    async getUserById(obj, args, info) {
      return await User.findById(args.userId);
    },
  },
  Mutation: {
    async createDevin(obj, args, info) {
      return await User.create({
        firstName: "devin",
        lastName: "stewart",
        email: "dstewart88@gmail.com",
        password: "password",
        organization: "619a84d60b5332d8e58b90a6",
      });
    },
  },
};

const UserSchema = makeExecutableSchema({
  typeDefs: [typeDefs, globalTypeDefs],
  resolvers: [resolvers],
});

export default UserSchema;
