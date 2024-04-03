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
import SelectBoundingBoxes from "@/src/pages/SelectBoundingBoxes.jsx";
import UploadModel from "@/src/pages/UploadModel.jsx";
import { Toaster } from "@/components/ui/toaster"
import { CookiesProvider } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home.jsx'
import EditProfile from "@/src/pages/EditProfile.jsx";



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
    path: "/notes",
    element: <Note noteId={5} />,
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
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/select-boxes",
    element: <SelectBoundingBoxes />,
  },
  {
    path: "/upload-model",
    element: <UploadModel />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Toaster />
      <App />
    </CookiesProvider>
  </React.StrictMode>
);