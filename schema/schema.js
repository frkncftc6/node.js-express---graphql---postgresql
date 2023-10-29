import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

/* TypeDefs - START */
import { usersTypeDefs } from "../typeDefs/usersTypeDefs.js";
import { membersTypeDefs } from "../typeDefs/membersTypeDefs.js";
/* TypeDefs - END */

/* Resolvers - START */
import { usersResolvers } from "../resolvers/usersResolvers.js";
import { membersResolvers } from "../resolvers/membersResolvers.js";
/* Resolvers - END */

export const typeDefs = mergeTypeDefs([usersTypeDefs, membersTypeDefs]);
export const resolvers = mergeResolvers([usersResolvers, membersResolvers]);
