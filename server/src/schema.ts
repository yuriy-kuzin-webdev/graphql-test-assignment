import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
    description: String
    createdBy: String
    risks: [Risk!]!
  }

  type Risk {
    _id: ID!
    name: String!
    description: String
    categoryId: ID!
    category: Category!
    resolved: Boolean!
    createdBy: String
  }

  type Query {
    categories(filter: CategoryFilter, page: Int, limit: Int): [Category!]!
    category(id: ID!): Category
    risks(filter: RiskFilter, page: Int, limit: Int): [Risk!]!
    risk(id: ID!): Risk
  }

  type Mutation {
    createCategory(name: String!, description: String, createdBy: String): Category!
    updateCategory(id: ID!, name: String, description: String): Category
    deleteCategory(id: ID!): Boolean!

    createRisk(name: String!, description: String, categoryId: ID!, resolved: Boolean!, createdBy: String): Risk!
    updateRisk(id: ID!, name: String, description: String, resolved: Boolean): Risk
    deleteRisk(id: ID!): Boolean!
  }

  input CategoryFilter {
    name: String
    description: String
    createdBy: String
  }

  input RiskFilter {
    name: String
    description: String
    createdBy: String
    resolved: Boolean
    categoryId: ID
  }
`;
