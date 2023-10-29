import gql from "graphql-tag";

export const membersTypeDefs = gql`
  type Member {
    memberId: String
    memberToSelect: String
  }

  type Query {
    getMembers(search: String): [Member]
  }
`;
