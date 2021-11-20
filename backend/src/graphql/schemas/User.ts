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
      return User.findById(args.userId);
    },
  },
  // Mutation: {
  // },
};

const UserSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default UserSchema;
