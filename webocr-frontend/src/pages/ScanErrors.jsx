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

import { useEffect, useState } from "react";
import api from "../APIService.js";
import Cookies from "js-cookie";

function ScanErrors() {
  const [modelErrors, setModelErrors] = useState([]);

  useEffect(() => {
    api
      .get("http://ocr-api:8080/api/ocrError", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setModelErrors(response.data.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [modelErrors]);

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout className="">
          <h1 className="font-bold text-3xl ml-40 mt-8">Błędy skanowania</h1>
          <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32 h-screen">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-4/5">
              <CardHeader className="text-left ml-2 space-y-0 pt-3 pb-5">
                <CardTitle className="text-xl pb-2">Lista błędów</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] font-bold">
                        ID błędu
                      </TableHead>
                      <TableHead>Zmienione słowo</TableHead>
                      <TableHead>Status błędu</TableHead>
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
                          <TableCell>{error.correctContent}</TableCell>
                          <TableCell>
                            {!error.isAccepted ? (
                              <div className="border border-[#760B0D] text-[#760B0D] min-w-1/3 max-w-1/2 text-center font-bold text-sm py-2 px-2 rounded-[10px]">
                                Niesprawdzony
                              </div>
                            ) : (
                              <div className="border border-[#00844E] text-[#00844E] min-w-1/3 max-w-1/2 text-center font-bold text-sm py-2 px-2 rounded-[10px]">
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

export default ScanErrors;
