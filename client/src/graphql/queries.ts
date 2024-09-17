import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($page: Int, $limit: Int, $filter: CategoryFilter) {
    categories(page: $page, limit: $limit, filter: $filter) {
      categories {
        _id
        name
        description
        createdBy
      }
      totalPages
    }
  }
`;

export const GET_CATEGORIES_IDS = gql`
  query GetCategories($page: Int, $limit: Int) {
    categories(page: $page, limit: $limit) {
      categories {
        _id
        name
      }
      totalPages
    }
  }
`;

export const GET_RISKS = gql`
  query GetRisks($page: Int, $limit: Int, $filter: RiskFilter) {
    risks(page: $page, limit: $limit, filter: $filter) {
      risks {
        _id
        name
        description
        resolved
        createdBy
        category {
          name
        }
      }
      totalPages
    }
  }
`;
