import { gql } from '@apollo/client';

export const QUERY_NEWESY_SUBREDDITS = gql`
  query Subreddits($limit: Int) {
    subreddits(limit: $limit, sort: "created_at:desc") {
      name
      icon {
        url
      }
    }
  }
`;
