export const groupTypeDef = `#graphql
  type Groups {
    id: ID!
    name: String!
    ownedBy: User!
    createdAt: User!
    projects: [Project!]!
  }
`;

export const groupResolver = { };
