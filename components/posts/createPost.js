import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { LinkForm } from './forms/linkForm';
import { TextForm } from './forms/textForm';

export const CreatePost = ({ session }) => {
  const [createPost] = useMutation(CREATE_POST);
  const [postType, setPostType] = useState('text');
  const [selected, setSelected] = useState(1);

  const {
    loading,
    error,
    data: queryData,
  } = useQuery(USER_QUERY, {
    variables: { username: session.user.name },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const subredditsList = queryData.users[0].subreddits;

  return (
    <div>
      <div>
        <input
          type="radio"
          id="text"
          name="type"
          defaultChecked
          onChange={() => {
            setPostType('text');
          }}
        />
        <label for="text">text</label>
      </div>
      <div>
        <input
          required
          type="radio"
          id="link"
          name="type"
          onChange={() => {
            setPostType('link');
          }}
        />
        <label for="link">link</label>
      </div>

      <div>
        <select
          onChange={(e) => {
            setSelected(e.target.value);
          }}>
          {subredditsList.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.id}>
              r/{subreddit.name}
            </option>
          ))}
        </select>
      </div>

      {postType === 'text' ? (
        <TextForm
          mutation={createPost}
          userId={session.id}
          selectedSubreddit={selected}
        />
      ) : (
        <LinkForm
          mutation={createPost}
          userId={session.id}
          selectedSubreddit={selected}
        />
      )}
    </div>
  );
};

const USER_QUERY = gql`
  query Users($username: String) {
    users(where: { username: $username }) {
      subreddits {
        name
        id
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $text: String
    $url: String
    $user: ID!
    $subreddit: ID!
  ) {
    createPost(
      input: {
        data: {
          title: $title
          text: $text
          url: $url
          user: $user
          subreddit: $subreddit
        }
      }
    ) {
      post {
        title
        text
        url
        user {
          id
        }
        subreddit {
          id
        }
      }
    }
  }
`;
