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
