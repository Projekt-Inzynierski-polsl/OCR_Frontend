import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
  height: 100vh;
`;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import api from "../APIService.js";
import Cookies from "js-cookie";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get("http://localhost:8051/api/user", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.items);
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main className="flex flex-col lg:grid lg:grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <h1 className="font-bold text-3xl ml-8 lg:ml-40 mt-8">
            Zarządzanie użytkownikami
          </h1>
          <div className="dashboard-info flex flex-row items-top gap-4 mt-8 lg:mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-full lg:w-4/5">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Lista użytkowników
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] font-bold">
                        ID użytkownika
                      </TableHead>
                      <TableHead>Nazwa użytkownika</TableHead>
                      <TableHead>Adres e-mail</TableHead>
                      <TableHead>Typ użytkownika</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.nickname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.roleId === 2 ? (
                            <div className="border border-[#0072D8] text-[#0072D8] text-center font-bold text-sm py-2 px-2 rounded-[10px]">
                              Użytkownik
                            </div>
                          ) : (
                            <div className="border border-[#00844E] text-[#00844E] text-center font-bold text-sm py-2 px-2 rounded-[10px]">
                              Administrator
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`/edit-profile/${user.id}`}
                            className="font-bold text-blue-700 text-md"
                          >
                            Edytuj
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}

                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan="7" className="text-center">
                          Brak użytkowników
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </main>
    </>
  );
}

export default AdminDashboard;
