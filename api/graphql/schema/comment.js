export const commentTypeDef = `#graphql
  type Comment {
    id: ID!
    content: String
    attachements: [String!]
    createdBy: User!
    # createdAt: Date!
    likedBy: [User!]!
  }
`;

export const commentResolver = { };
