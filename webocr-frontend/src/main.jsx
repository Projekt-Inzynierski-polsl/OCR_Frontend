import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import FirstNote from "@/src/pages/FirstNote.jsx";
import Note from "@/src/pages/Note.jsx";
import AdminDashboard from "@/src/pages/AdminDashboard.jsx";
import UserManagement from "@/src/pages/UserManagement.jsx";
import ScanErrors from "@/src/pages/ScanErrors.jsx";
import CheckScanError from "@/src/pages/CheckScanError.jsx";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/hello",
    element: <FirstNote />,
  },
  {
    path: "/dashboard",
    element: <Note />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/users",
    element: <UserManagement />,
  },
  {
    path: "/errors",
    element: <ScanErrors />,
  },
  {
    path: "/check-error",
    element: <CheckScanError />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);