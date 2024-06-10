import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
`;

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input.jsx";
import { useEffect, useState } from "react";
import api from "../APIService.js";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function CheckScanError() {
  const {errorId} = useParams();
  const [ocrError, setOcrError] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const [img, setImg] = useState("");
  const handleErrorCheck = (action) => {
    api
      .put(`http://localhost:8051/api/ocrError/${errorId}`, {
        isAccepted: true,
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        toast({
          title: "Poprawka zaakceptowana!",
          body: "Sprawdź też inne błędy.",
        });
        navigate("/errors")
      })
  };

  useEffect(() => {
    api
        .get(`http://localhost:8051/api/ocrError/${errorId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setOcrError(response.data);
          
        })
        api
        .get(`http://localhost:8051/api/ocrError/${errorId}/file`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
          responseType: 'blob'
        })
        .then((response) => {
          const url = URL.createObjectURL( response.data );
          setImg(url)
        })
  }, [errorId]);

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout className="h-screen">
          <h1 className="font-bold text-3xl ml-40 mt-8">Błąd #{errorId}</h1>
          <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-4/5">
              <CardContent className="pb-6 pl-16 pt-6 mr-64">
                <div className="text-inputs grid grid-cols-2 mt-6 mb-24 gap-16">
                <div className="scanned-image flex flex-col gap-2">
                  <p className="font-bold text-lg">Wrzucone zdjęcie</p>
                  <img src={img} alt="" className="w-5xl h-4xl" />
                </div>
                  <div className="input-container">
                    <p className="font-bold text-lg mb-2">Zaproponowany tekst</p>
                    <Input
                      type="text"
                      readonly="true"
                      className="py-6 border-slate-300"
                      value={ocrError.correctContent}
                    />
                  </div>
                </div>

                <div className="buttons-container grid grid-cols-2 mt-12 gap-8 w-2/3">
                  <button
                    className="border border-[#004601] text-[#004601] text-center font-bold rounded-[10px] py-3"
                    onClick={() => handleErrorCheck("accept")}
                  >
                    Zaakceptuj poprawkę
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </main>
    </>
  );
}

export default CheckScanError;
