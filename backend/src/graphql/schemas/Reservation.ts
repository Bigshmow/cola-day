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
    createReservation(
      roomId: ID
      start: Int
      end: Int
      startHour: String
      endHour: String
    ): Reservation
    deleteReservation(resId: ID): JSONObject
    editReservation(
      resId: ID
      roomId: ID
      start: Int
      end: Int
      startHour: String
      endHour: String
    ): JSONObject
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
      const { roomId, start, end, startHour, endHour } = args;
      const user = await UserObject.createUserObject(
        context.session.get("user")
      );
      const orgId = user.getUserOrganization();
      return await ReservationObject.createReservation(
        roomId,
        start,
        startHour,
        end,
        endHour,
        orgId
      );
    },
    async deleteReservation(obj, args, info) {
      const { resId } = args;
      return Reservation.findByIdAndDelete(resId);
    },
    async editReservation(obj, args, info) {
      const { resId, roomId, start, startHour, end, endHour } = args;
      const reservationObject = await ReservationObject.createReservationObject(
        resId
      );
      return reservationObject.editReservation(
        roomId,
        start,
        startHour,
        end,
        endHour
      );
    },
  },
};

const ReservationSchema = makeExecutableSchema({
  typeDefs: [typeDefs, globalTypeDefs],
  resolvers: [resolvers],
});

export default ReservationSchema;
