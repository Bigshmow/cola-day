import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
// import { GraphQLContext } from "../interfaces";
import User from "../../collections/User";

const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Query {
    getUserById(userId: ID): User
  }

  type Mutation {
    createDevin: User
  }

  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    organization: String
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
  typeDefs,
  resolvers,
});

export default UserSchema;
