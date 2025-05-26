import React from 'react';
import { useQuery, gql } from '@apollo/client';

// 1. Your GraphQL Query
const GET_USERS = gql`
  query GetUsers {
    getUser {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  // ❌ ERROR: You forgot to pass GET_USERS to useQuery()
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) {
    return <>Data is loading...</>;
  }

  if (error) {
    return <>Error - {error.message}</>;
  }

  // ❌ ERROR: data is not an array directly — it's an object like { getUser: [...] }
  return (
    <div>
      <h1>User Data</h1>
      <div>
        {data.getUser.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>isMarried: {user.isMarried ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
