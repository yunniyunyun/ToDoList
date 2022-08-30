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
function Home() {
  return (
    <>
      <main>
        <h2>首頁</h2>
        <p>歡迎來到首頁</p>
      </main>
      
    </>
  );
}
function Layout() {
  const { token} = useAuth(); 
  return (
    <>
      <div className="header">
      表頭
      <nav>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>signup</Link>
        </li>
        <li>
          <Link to='/login'>login</Link>
        </li>
        {
          token && <li>
          <Link to='/todo'>todo</Link>
        </li>
        }
      </nav>
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">表尾</div>
    </>
  );
}
function App() {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Todo" element={<ToDo />}></Route>
      <Route path="*" element={<Login />}></Route>
    </Routes>
    </AuthContext.Provider>
  );
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute/>}>
              <Route path="/todo" element={<ToDo />} />
            </Route>
            <Route path="signUp" element={<SignUp />} />
            <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
