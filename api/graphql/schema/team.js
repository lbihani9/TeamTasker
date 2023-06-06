export const teamTypeDef = `#graphql
  type Team {
    id: ID!
    name: String!
    members: [User!]!
    createdBy: User!
    # createdAt: DateTime!
    childTeams: [Team!]!
    parentTeam: Team # there's no parent team for first level teams
    maintainers: [User!]!
  }
`;

export const teamResolver = { };
