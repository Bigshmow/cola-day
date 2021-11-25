import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { typeDefs as globalTypeDefs } from "./typedefs";
import Room from "../../collections/Room";
import { RoomObject } from "../../class/RoomObject";

const typeDefs = gql`
  type Query {
    getRoomById(userId: ID): User
    getRoomReservations(roomId: ID): [Reservation]
    getAllRooms: [Room]
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
    async getAllRooms(obj, args, info) {
      return await Room.find({});
    },
    async getRoomReservations(obj, args, info) {
      const { roomId } = args;
      return await RoomObject.getRoomReservations(roomId);
    },
  },
  Mutation: {
    async createRooms(obj, args, info) {
      return RoomObject.createRooms();
    },
  },
};

const RoomSchema = makeExecutableSchema({
  typeDefs: [typeDefs, globalTypeDefs],
  resolvers: [resolvers],
});

export default RoomSchema;
