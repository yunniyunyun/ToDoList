import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ToDo from './pages/ToDos';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { AuthContext, useAuth } from "./components/Context";
import { ProtectedRoute } from './components/ProtectedRoute';
import { Routes, Route, Link,Outlet } from "react-router-dom";
function App() {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Todo" element={<ToDo />}></Route>
      <Route path="*" element={<ToDo />}></Route>
    </Routes>
    </AuthContext.Provider>
  );
  // <Route path="*" element={<Login />}></Route>
}

export default App;
