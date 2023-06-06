import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/type-defs.js";
import { resolvers } from "./graphql/resolvers.js";
import initializeDBConnection from "./db.js";

export const driver = initializeDBConnection();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  /**
   *  Apollo Server v4 introduced a regression where providing invalid variables yields a 200 status code instead of 400. 
   *  To mitigate this regression, `status400ForVariableCoercionErrors: true` is required.
   */
  status400ForVariableCoercionErrors: true,
  includeStacktraceInErrorResponses: true,
  formatError: (formattedError, error) => {
    if (process.env.ENV !== "development") {
      delete formattedError.extensions.stacktrace;
    }
    return formattedError;
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { 
    port: process.env.GRAPHQL_PORT
  },
  context: async ({ req, res }) => {
    return {};
  }
});

console.log(`GraphQL is running at: ${url}`);