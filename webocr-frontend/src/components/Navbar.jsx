import styled from "styled-components";
import api from "../APIService.js";

const Avatar = styled.span`
  padding: 16px;
  font-weight: bold;
  font-size: 1rem;
  background-color: #00844e;
  border-radius: 50%;
  color: white;
`;

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Navbar() {
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    api
      .get("http://localhost:8051/api/user/logged", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast(error)
      });
  }, []);

  return (
    <>
      <nav className="flex flex-row items-center justify-between pl-32 pr-16 pt-8 pb-8 border border-slate-200">
        <img src="/logo_black.png" alt="" className="w-32" />
        <div className="user-container flex flex-row items-center">
          <div className="user ml-4">
            <p className="user text-lg">{userData.nickname}</p>
            <p className="email text-sm"> {userData.email}</p>
          </div>
          <button
            className="flex flex-row items-center ml-10 gap-2"
            onClick={handleLogout}
          >
            <img src="/log-out.svg" alt="" />
            Wyloguj się
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
