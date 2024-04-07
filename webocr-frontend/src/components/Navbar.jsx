import styled from "styled-components";
import { useToast } from "@/components/ui/use-toast";

const Avatar = styled.span`
  padding: 16px;
  font-weight: bold;
  font-size: 1rem;
  background-color: #00844e;
  border-radius: 50%;
  color: white;
`;

import Cookies from "js-cookie";

import axios from "axios";
import { useEffect } from "react";

function Navbar() {
  const { toast } = useToast();

  const handleLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    window.location.href = "/";
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          axios
            .get("http://localhost:8051/api/account/token", {
              headers: {
                Authorization: `Bearer ${Cookies.get("authToken")}`,
              },
            })
            .then((response) => {
                Cookies.set("authToken", response.data, { path: "/", expires: 7})
            })
            .catch((error) => {
               toast({
                    title: "Błąd",
                    description: error.response.data,
                    status: "error",
                });
                Cookies.remove("authToken", { path: "/" });
                window.location.href = "/login";
            });
        }
        return Promise.reject(error);
      }
    );

    // pobieranie informacji o userze
    
  }, []);

  return (
    <>
      <nav className="flex flex-row items-center justify-between pl-32 pr-16 pt-8 pb-8 border border-slate-200">
        <img src="/logo_black.png" alt="" className="w-32" />
        <div className="user-container flex flex-row items-center">
          <Avatar>TB</Avatar>
          <div className="user ml-4">
            <p className="user text-lg">Tomasz Bury</p>
            <p className="email text-sm"> dto@gmail.com</p>
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
