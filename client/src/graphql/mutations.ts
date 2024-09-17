import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const DELETE_RISK = gql`
  mutation DeleteRisk($id: ID!) {
    deleteRisk(id: $id)
  }
`;

export const UPDATE_RISK = gql`
  mutation UpdateRisk($id: ID!, $resolved: Boolean!) {
    updateRisk(id: $id, resolved: $resolved) {
      _id
      resolved
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String!, $createdBy: String!) {
    createCategory(name: $name, description: $description, createdBy: $createdBy) {
      _id
      name
      description
      createdBy
    }
  }
`;

export const CREATE_RISK = gql`
  mutation CreateRisk($name: String!, $description: String!, $createdBy: String!, $categoryId: ID!, $resolved: Boolean!) {
    createRisk(name: $name, description: $description, createdBy: $createdBy, categoryId: $categoryId, resolved: $resolved) {
      _id
      name
      description
      createdBy
    }
  }
`;
