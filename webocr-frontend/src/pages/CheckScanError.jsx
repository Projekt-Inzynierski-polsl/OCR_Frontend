import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/AdminSidebar.jsx";

const MainLayout = styled.div`
  background-color: #f9fafb;
  font-family: "Space Grotesk";
`;

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input.jsx";
import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CheckScanError({ errorId }) {
  const handleErrorCheck = (action) => {
    // send action to server
    axios
      .post("http://localhost:8051/api/model/errors", {
        action: action,
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
            window.location.href = "/scan-errors";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <MainLayout>
          <h1 className="font-bold text-3xl ml-40 mt-8">Błąd #1112</h1>
          <div className="dashboard-info flex flex-row items-top gap-4 mt-8 mx-32">
            <Card className="bg-white border border-slate-100 flex flex-col pt-4 w-4/5">
              <CardContent className="pb-6 pl-16 pt-6 mr-64">
                <div className="scanned-image flex flex-col gap-2">
                  <p className="font-bold text-lg">Wrzucone zdjęcie</p>
                  <img src="/example_photo.png" alt="" className="w-48" />
                </div>
                <div className="text-inputs grid grid-cols-2 mt-12 gap-16">
                  <div className="input-container">
                    <p className="font-bold text-lg mb-2">Odczytany tekst</p>
                    <Input
                      type="text"
                      readonly="true"
                      className="py-6 border-slate-300"
                      value="toster"
                    />
                  </div>
                  <div className="input-container">
                    <p className="font-bold text-lg mb-2">Poprawiony tekst</p>
                    <Input
                      type="text"
                      readonly="true"
                      className="py-6 border-slate-300"
                      value="tester"
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
                  <button
                    className="border border-[#760B0D] text-[#760B0D] text-center font-bold rounded-[10px] py-3"
                    onClick={() => handleErrorCheck("reject")}
                  >
                    Odrzuć poprawkę
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
