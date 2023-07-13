import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodoApp from "./TodoApp";
// import { UserAuthContextProvider } from '../context/userAuthContext';

const Router = () => {
      return (
        // <UserAuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignIn" element={<SignUpPage />} /> 
            <Route path="/TodoApp" element={<TodoApp />} />
          </Routes>
        </BrowserRouter>
        // </UserAuthContextProvider>
      );
}

export default Router