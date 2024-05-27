import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import FirstNote from "@/src/pages/UploadNoteFile.jsx";
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
import AuthenticatedRoute from "./routes/AuthenticatedRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import PublicRoute from "./routes/index.jsx";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import EditProfile from "@/src/pages/EditProfile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      limit={5}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Slide}
    />
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Router>
        <Routes>
         <Route
            path="*"
            element={
              <PublicRoute>
                <NotFound />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/scan-note"
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
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/errors" element={<ScanErrors />} />
            <Route path="/errors/:errorId" element={<CheckScanError />} />
            <Route path="/edit-profile/:userId" element={<EditProfile />} />
            <Route path="/upload-model" element={<UploadModel />} />
          </Route>
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
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
      <Toaster />
    </CookiesProvider>
  </React.StrictMode>
);
