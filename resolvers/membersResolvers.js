import { getMembers } from "../components/members/getMembers.js";

export const membersResolvers = {
  Query: {
    getMembers: getMembers,
  },
};
