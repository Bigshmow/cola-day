import { gql, makeExecutableSchema } from "apollo-server-express";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { typeDefs as globalTypeDefs } from "./typedefs";
import Reservation from "../../collections/Reservation";
import { GraphQLContext } from "../interfaces";
import { UserObject } from "../../class/UserObject";
import { ReservationObject } from "../../class/ReservationObject";

const typeDefs = gql`
  type Query {
    getReservationById(resId: ID): Reservation
    getReservationsByOrgId: [RoomTime]
  }

  type Mutation {
    createReservation(roomId: ID, start: Int, end: Int): Reservation
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  Query: {
    async getReservationById(obj, args, info) {
      return await Reservation.findById(args.resId);
    },
    async getReservationsByOrgId(obj, args, context: GraphQLContext, info) {
      const user = await UserObject.createUserObject(
        context.session.get("user")
      );
      const orgId = user.getUserOrganization();
      return await ReservationObject.getOrgReservations(orgId);
    },
  },
  Mutation: {
    async createReservation(obj, args, context: GraphQLContext, info) {
      const { roomId, start, end } = args;
      const user = await UserObject.createUserObject(
        context.session.get("user")
      );
      const orgId = user.getUserOrganization();
      return await ReservationObject.createReservation(
        roomId,
        start,
        end,
        orgId
      );
    },
  },
};

const ReservationSchema = makeExecutableSchema({
  typeDefs: [typeDefs, globalTypeDefs],
  resolvers: [resolvers],
});

export default ReservationSchema;
