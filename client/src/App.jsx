import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

// 1. Query: Get All Users
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

// 2. Query: Get User by ID
const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

// 3. Mutation: Create User
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  const [newUser, setNewUser] = useState({ name: "", age: "", isMarried: false });

  // Query: All Users
  const { data: getUserData, error: getUserError, loading: getUserLoading, refetch } = useQuery(GET_USERS);

  // Query: User by ID (hardcoded ID = 1)
  const { data: getUserByIdData, error: getUserByIdError, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    { variables: { id: "1" } }
  );

  // Mutation: Create User
  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.age) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createUser({
        variables: {
          name: newUser.name,
          age: parseInt(newUser.age),
          isMarried: newUser.isMarried,
        },
      });

      setNewUser({ name: "", age: "", isMarried: false });
      refetch(); // refresh user list after creation
    } catch (err) {
      console.error("Create user error:", err.message);
    }
  };

  if (getUserLoading) return <p>Loading all users...</p>;
  if (getUserError) return <p>Error: {getUserError.message}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Create New User</h2>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Age"
        value={newUser.age}
        onChange={(e) => setNewUser((prev) => ({ ...prev, age: e.target.value }))}
      />
      <label>
        <input
          type="checkbox"
          checked={newUser.isMarried}
          onChange={(e) => setNewUser((prev) => ({ ...prev, isMarried: e.target.checked }))}
        />
        Married?
      </label>
      <button onClick={handleCreateUser}>Create User</button>

      <hr />

      <h2>Chosen User (ID: 1)</h2>
      {getUserByIdLoading ? (
        <p>Loading user by ID...</p>
      ) : getUserByIdError ? (
        <p>Error: {getUserByIdError.message}</p>
      ) : getUserByIdData && getUserByIdData.getUserById ? (
        <div>
          <p>Name: {getUserByIdData.getUserById.name}</p>
          <p>Age: {getUserByIdData.getUserById.age}</p>
          <p>Married: {getUserByIdData.getUserById.isMarried ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>No user found.</p>
      )}

      <hr />

      <h2>All Users</h2>
      {getUserData.getUser.map((user) => (
        <div key={user.id} style={{ marginBottom: "10px" }}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Married: {user.isMarried ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
