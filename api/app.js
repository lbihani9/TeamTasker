import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/type-defs.js";
import { resolvers } from "./graphql/resolvers.js";
import initializeDBConnection from "./db.js";

export const driver = initializeDBConnection();

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { 
    port: process.env.GRAPHQL_PORT
  },
});

console.log(`GraphQL is running at: ${url}`);