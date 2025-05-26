import React from "react";
import { useQuery, gql } from "@apollo/client";

// GraphQL Queries
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

const GET_USERS_BY_ID = gql`
  query GetUsersById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  // Query: All Users
  const {
    data: getUserData,
    error: getUserError,
    loading: getUserLoading,
  } = useQuery(GET_USERS);

  // Query: User by ID
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USERS_BY_ID, {
    variables: { id: "1" },
  });

  // Handle loading and error for ALL users
  if (getUserLoading) {
    return <>Data is loading...</>;
  }
  if (getUserError) {
    return <>Error - {getUserError.message}</>;
  }

  return (
    <div>
      <h1>All Users</h1>

      {/* Show User by ID */}
      <div>
        {getUserByIdLoading ? (
          <h2>Loading user by ID...</h2>
        ) : getUserByIdError ? (
          <h2>Error - {getUserByIdError.message}</h2>
        ) : getUserByIdData && getUserByIdData.getUserById ? (
          <h2>Chosen User: {getUserByIdData.getUserById.name}</h2>
        ) : (
          <h2>No user found by that ID</h2>
        )}
      </div>

      {/* Show All Users */}
      <div>
        {getUserData.getUser.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>isMarried: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
