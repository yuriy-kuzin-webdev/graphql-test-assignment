import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($page: Int, $limit: Int) {
    categories(page: $page, limit: $limit) {
      _id
      name
      description
      createdBy
    }
  }
`;

export const GET_RISKS = gql`
  query GetRisks($page: Int, $limit: Int) {
    risks(page: $page, limit: $limit) {
      _id
      name
      description
      resolved
      createdBy
    }
  }
`;
