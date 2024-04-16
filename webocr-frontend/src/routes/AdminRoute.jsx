import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

const checkAuth = () => {
  const [logged, setLogged] = useState();
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8051/api/user/logged", {
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
  return isAdmin ? <Outlet /> : <Navigate to="/forbidden" />;
};

export default AdminRoute;
