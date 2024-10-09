import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../APIService.js";
import { useState, useEffect } from "react";

const checkAuth = () => {
  const [logged, setLogged] = useState();
  useEffect(() => {
    const fetchData = () => {
      api
        .get("https://ocr-api:8080/api/user/logged", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setLogged(response.data.roleId === 1);
        })
        .catch((error) => {
          console.error(error);
          setLogged(false);
        });
    };
    fetchData();
  }, []);

  return logged;
};

const AdminRoute = ({ children }) => {
  const isAdmin = checkAuth();
  if (isAdmin === undefined) return null;
  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
