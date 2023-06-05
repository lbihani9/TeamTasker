export const organizationTypeDef = `#graphql
  type Organization {
    id: ID!
    name: String!
    slug: String!
    email: String
    avatar: String
    description: String
    members: [User!]!
    ownedBy: [User!]!
    projects: [Project!]!
    # createdAt: Date!
    teams: [Team!]!
    maintainers: [User!]!
  }
`;


export const organizationResolver = { };
