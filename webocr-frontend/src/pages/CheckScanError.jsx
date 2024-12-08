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
    if (action === "accept") {
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
    } else {
      api
      .delete(`http://localhost:8051/api/ocrError/${errorId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        toast({
          title: "Poprawka usunięta pomyślnie!",
          body: "Sprawdź też inne błędy.",
        });
        navigate("/errors")
      })
    }
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
      <main className="flex flex-col lg:grid lg:grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout className="h-screen max-lg:pt-8">
          <h1 className="font-bold text-3xl ml-8 lg:ml-40 mt-8">Błąd #{errorId}</h1>
          <div className="dashboard-info flex flex-col lg:flex-row items-top gap-4 mt-8 lg:mx-32 ml-8 max-md:w-full">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-4/5">
              <CardContent className="pb-6 lg:pl-16 pt-6">
                <div className="text-inputs flex flex-col xl:grid xl:grid-cols-2 mt-6 mb-24 gap-16">
                <div className="scanned-image gap-2">
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

                <div className="buttons-container flex flex-col lg:grid lf:grid-cols-2 mt-12 gap-8">
                  <button
                    className="border border-[#004601] text-[#004601] text-center font-bold rounded-[10px] py-3"
                    onClick={() => handleErrorCheck("accept")}
                  >
                    Zaakceptuj poprawkę
                  </button>
                  <button
                    className="border border-[#760b0d] text-[#760b0d] text-center font-bold rounded-[10px] py-3"
                    onClick={() => handleErrorCheck("delete")}
                  >
                    Usuń poprawkę
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
