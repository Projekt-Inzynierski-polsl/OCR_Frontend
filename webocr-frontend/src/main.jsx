import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FirstNote from "@/src/pages/FirstNote.jsx";
import Note from "@/src/pages/Note.jsx";
import AdminDashboard from "@/src/pages/AdminDashboard.jsx";
import UserManagement from "@/src/pages/UserManagement.jsx";
import ScanErrors from "@/src/pages/ScanErrors.jsx";
import CheckScanError from "@/src/pages/CheckScanError.jsx";
import SelectBoundingBoxes from "@/src/pages/SelectBoundingBoxes.jsx";
import UploadModel from "@/src/pages/UploadModel.jsx";
import CheckOutput from "@/src/pages/CheckOutput.jsx";
import { Toaster } from "@/components/ui/toaster";
import { CookiesProvider } from "react-cookie";
import AuthenticatedRoute from "./routes/index.jsx";

import { BrowserRouter as Router, Route, Routes, createRoutesFromElements } from "react-router-dom";

import Home from "./pages/Home.jsx";
import EditProfile from "@/src/pages/EditProfile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/hello"
            element={
              <AuthenticatedRoute>
                <FirstNote />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <AuthenticatedRoute>
                <Note />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/notes/:noteId"
            element={
              <AuthenticatedRoute>
                <Note />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthenticatedRoute>
                <AdminDashboard />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AuthenticatedRoute>
                <UserManagement />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/errors"
            element={
              <AuthenticatedRoute>
                <ScanErrors />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/errors/:errorId"
            element={
              <AuthenticatedRoute>
                <CheckScanError />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/edit-profile/:userId"
            element={
              <AuthenticatedRoute>
                <EditProfile />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/select-boxes"
            element={
              <AuthenticatedRoute>
                <SelectBoundingBoxes />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/check-output"
            element={
              <AuthenticatedRoute>
                <CheckOutput />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/upload-model"
            element={
              <AuthenticatedRoute>
                <UploadModel />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </CookiesProvider>
  </React.StrictMode>
);
