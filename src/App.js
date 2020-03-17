import React, { useState } from "react";
import "./App.css";
import "./index.css";
import LoginForm from "./LoginForm";
import UsersList from "./UsersList";

function App() {
  const [users, setUsers] = useState({ email: "", password: "" });
  return (
    <div className="App">
      <LoginForm />
      <UsersList />
    </div>
  );
}

export default App;
