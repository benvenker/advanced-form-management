import React, { useState } from "react";
import "./App.css";
import "./index.css";
import LoginForm from "./LoginForm";
import UsersList from "./UsersList";

function App() {
  const [users, setUsers] = useState({ email: "", password: "" });
  return (
    <div className="App">
      <h1>User Onboarding</h1>
      <h3>Enter your information to get started</h3>
      <LoginForm />
      <UsersList />
    </div>
  );
}

export default App;
