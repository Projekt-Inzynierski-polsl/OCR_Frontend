import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
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

import {useState, useEffect} from 'react';
import axios from "axios";
import Cookies from 'js-cookie';


function AdminDashboard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modelErrors, setModelErrors] = useState([]);
  const [modelUpdates, setModelUpdates] = useState([]);
  const [adminStats, setAdminStats] = useState({
    activeUsers: 111,
    activeScanErrors: 222,
    repairedScanErrors: 333,
    todayNotes: 444,
  })

  useEffect( () => {
     axios
      .get("http://localhost:8051/api/model/errors", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // todo: zmienic response w sytuacji kiedy bedzie wiadomo co bedzie wysylane i jak
          //setModelErrors(response.data);
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });

     axios
      .get("http://localhost:8051/api/model/updates", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // todo: zmienic response w sytuacji kiedy bedzie wiadomo co bedzie wysylane i jak
          //setModelUpdates(response.data);
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });

     axios
      .get("http://localhost:8051/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // todo: zmienic response w sytuacji kiedy bedzie wiadomo co bedzie wysylane i jak
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  });

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <div className="stats flex flex-row mx-32 mt-10 gap-4">
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-8 w-1/4">
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
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
              <CardContent className="pb-0">
                <p className="text-5xl font-bold text-right mr-2 text-red-600">
                  {adminStats.activeScanErrors}
                </p>
              </CardContent>
              <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Aktywne błędy skanowania
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
              <CardContent className="pb-0">
                <p className="text-5xl font-bold text-right mr-2 text-green-700">
                  {adminStats.repairedScanErrors}
                </p>
              </CardContent>
              <CardHeader className="text-right mr-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Naprawione błędy skanowania
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col items-end justify-end pt-4 w-1/4">
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
                      <TableHead>Data zgłoszenia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelErrors.map((error) => (
                      <TableRow>
                        <TableCell className="font-medium">
                          {error.id}
                        </TableCell>
                        <TableCell>{error.readWord}</TableCell>
                        <TableCell>{error.correctWord}</TableCell>
                        <TableCell>{error.scanDate}</TableCell>
                        <TableCell>
                          {error.status === "unchecked" ? (
                            <div className="border border-[#760B0D] text-[#760B0D] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">
                              Niesprawdzony
                            </div>
                          ) : (
                            <div className="border border-[#00844E] text-[#00844E] text-center font-bold text-sm py-2 px-2 w-3/5 rounded-[10px]">
                              Zweryfikowany
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`/model-error/${error.id}`}
                            className="font-bold text-blue-700 text-md"
                          >
                            Szczegóły
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-1/4">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">
                  Historia aktualizacji modelu
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[185px] font-bold">
                        Numer zmiany
                      </TableHead>
                      <TableHead>Data zmiany</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelUpdates.map((update) => (
                      <TableRow>
                        <TableCell className="font-medium">Wersja {update.id}</TableCell>
                        <TableCell>{update.date}</TableCell>
                      </TableRow>
                    ))}
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
