export const projectTypeDef = `#graphql
  type Project {
    id: ID!
    name: String!
    ownedBy: [User!]!
    members: [User!]! # the person creating the project will also be present in this list.
    # createdAt: DateTime!
    # status: ProjectStatus!
    tasks: [Task!]!
    maintainers: [User!]!
  }
`;

export const projectResolver = { };
