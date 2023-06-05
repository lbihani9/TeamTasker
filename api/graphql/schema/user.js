export const userTypeDef = `#graphql
  extend type Query {
    users: [User]
  }

  type User {
    id: ID
    name: String
    username: String
    email: String
    description: String
    country: String
    countryCode: String
    mobile: String
    # createdAt: Date!
    avatar: String
    # ownedOrganizations: [Organization!]!
    # memberOrganizations: [Organization!]!
  }
`;


export const userResolver = {
  Query: {
    users() {
      return [
        {
          id: "1",
          name: "Lokesh Bihani",
          username: "lbihani9"
        }
      ];
    }
  }
};