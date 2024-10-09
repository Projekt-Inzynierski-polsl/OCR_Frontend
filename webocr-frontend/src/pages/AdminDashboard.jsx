import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
  height: 100vh;
`;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import api from "../APIService.js";
import Cookies from "js-cookie";

function AdminDashboard() {
  const [modelErrors, setModelErrors] = useState([]);
  const [modelUpdates, setModelUpdates] = useState([]);
  const [adminStats, setAdminStats] = useState({
    activeUsers: null,
    activeScanErrors: null,
    todayNotes: null,
  });

  useEffect(() => {
    api
      .get("https://ocr-api:8080/api/userLog", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        params: {
          type: "Registration",
        },
      })
      .then((response) => {
        setAdminStats((prevStats) => ({
          ...prevStats,
          activeUsers: response.data.items.length,
        }));
      });
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 1);
    api
      .get("https://ocr-api:8080/api/userLog", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        params: {
          startTimestamp: Math.round(startDate.getTime() / 1000),
          endTimestamp: Math.round(endDate.getTime() / 1000),
          type: "CreateNote",
        },
      })
      .then((response) => {
        setAdminStats((prevStats) => ({
          ...prevStats,
          todayNotes: response.data.items.length,
        }));
      });

    api
      .get("https://ocr-api:8080/api/userLog", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
        params: {
          type: "ReportError",
        },
      })
      .then((response) => {
        setAdminStats((prevStats) => ({
          ...prevStats,
          activeScanErrors: response.data.items.length,
        }));
        
      });


    api
    .get("https://ocr-api:8080/api/ocrError", {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
    })
    .then((response) => {
      setModelErrors(response.data.items);
    });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <div className="stats flex flex-row mx-32 mt-10 gap-4">
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-8 w-1/3">
              <CardContent className="pb-0">
                <p className="text-5xl font-bold text-right mr-2">
                  {adminStats.activeUsers}
                </p>
              </CardContent>
              <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Aktywni użytkownicy
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/3">
              <CardContent className="pb-0">
                <p className="text-5xl font-bold text-right mr-2 text-red-600">
                  {adminStats.activeScanErrors}
                </p>
              </CardContent>
              <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Zgłoszone błędy skanowania
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/3">
              <CardContent className="pb-0">
                <p className="text-5xl font-bold text-right mr-2">
                  {adminStats.todayNotes}
                </p>
              </CardContent>
              <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Ilość notatek z dzisiejszego dnia
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-3/4">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Aktywne błędy skanowania
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] font-bold">
                        ID zgłoszenia
                      </TableHead>
                      <TableHead>Odczytane słowo</TableHead>
                      <TableHead>Prawidłowe słowo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelErrors.length > 0 ? (
                      modelErrors.map((error) => (
                        <TableRow key={error.id}>
                          <TableCell className="font-medium">
                            {error.id}
                          </TableCell>
                          <TableCell>{error.wrongContent}</TableCell>
                          <TableCell>{error.correctContent}</TableCell>
                          <TableCell>
                            {!error.isAccepted ? (
                              <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2  rounded-[10px]">
                                Niesprawdzony
                              </div>
                            ) : (
                              <div className="border border-[#00844E] text-[#00844E] text-center font-bold text-sm py-2 px-2  rounded-[10px]">
                                Zweryfikowany
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <a
                              href={`/errors/${error.id}`}
                              className="font-bold text-blue-700 text-md"
                            >
                              Szczegóły
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="6" className="text-center">
                          Brak błędów
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
