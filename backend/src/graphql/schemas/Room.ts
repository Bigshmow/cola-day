import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { typeDefs as globalTypeDefs } from "./typedefs";
import Room from "../../collections/Room";
import { RoomObject } from "../../class/RoomObject";

const typeDefs = gql`
  type Query {
    getRoomByUserId(userId: ID): User
    getRoomReservations(roomId: ID): [Reservation]
    getAllRoomsReservationHours: [RoomHours]
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
    async getRoomByUserId(obj, args, info) {
      return await Room.findById(args.userId);
    },
    async getAllRooms(obj, args, info) {
      return await Room.find({});
    },
    async getRoomReservations(obj, args, info) {
      const { roomId } = args;
      return await RoomObject.getRoomReservations(roomId);
    },
    async getAllRoomsReservationHours(obj, args, info) {
      return await RoomObject.getRoomHours();
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
