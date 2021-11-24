import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { typeDefs as globalTypeDefs } from "./typedefs";
import Room from "../../collections/Room";

const typeDefs = gql`
  type Query {
    getRoomById(userId: ID): User
  }

  type Mutation {
    createRooms: Boolean
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  Query: {
    async getRoomById(obj, args, info) {
      return await Room.findById(args.userId);
    },
  },
  Mutation: {
    async createRooms(obj, args, info) {
      for (let i = 0; i < 20; i++) {
        let roomNumber = 101 + i;
        await Room.create({
          number: roomNumber,
          reservations: [],
        });
      }
      return 1;
    },
  },
};

const RoomSchema = makeExecutableSchema({
  typeDefs: [typeDefs, globalTypeDefs],
  resolvers: [resolvers],
});

export default RoomSchema;
