const { ApolloServer } = require('apollo-server');
const neo4j = require('neo4j-driver');
const { Neo4jGraphQL } = require('@neo4j/graphql');
const { startStandaloneServer } = require('@apollo/server/standalone');

/**
 * import typeDefs, queries, mutations, resolvers from their respective files and combine them here.
 */