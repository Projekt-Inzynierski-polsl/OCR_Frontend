import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BBoxAnnotator from 'react-bbox-annotator';
import React, { Fragment, useState } from "react";

const FirstNoteHero = styled.div`
  background-color: #bfe6ce;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 96px;
  border-radius: 16px;
`;

function SelectBoundingBoxes() {
  const [selectedTab, setSelectedTab] = useState("notatka");
  const labels = ['Mama cow', 'Baby cow'];
    const [entries, setEntries] = useState([]);
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <div style={{ width: '60%' }}>
                <BBoxAnnotator
                    url="https://pandoxeio.files.wordpress.com/2044/12/bigstock-cows-mother-and-baby-3998546.jpg"
                    inputMethod="select"
                    labels={labels}
                    onChange={(e) => setEntries(e)}
                />
            </div>
            <pre>{JSON.stringify(entries)}</pre>
      {/* <main className="flex flex-col items-center pb-16">
        <FirstNoteHero className="py-16 w-full">
          <h1 className="text-5xl font-bold">Zaznacz, co chciałbyś zachować</h1>
          <p className="max-w-3xl text-center mt-4 text-md">
            Twoja notatka została zeskanowana i przetworzona. Jeżeli to
            potrzebne, zaznacz na zdjęciu części tekstu i innych elementów.
          </p>
        </FirstNoteHero>
        <div className="bound-container border border-[#D1D5DB] w-60% mt-8">
          <Tabs
            className="float-right mr-4 mt-2"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList>
              <TabsTrigger
                className="data-[state=active]:bg-[#e9f7ee]"
                value="notatka"
              >
                Notatka
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-[#e9f7ee]"
                value="obrazek"
              >
                Obrazek
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notatka"></TabsContent>
            <TabsContent value="obrazek"></TabsContent>
          </Tabs>
          
        </div>
        
        <pre>{JSON.stringify(entries)}</pre>
        <NextButton className="mt-16 w-1/3"> Przejdź dalej &gt;</NextButton>
      </main> */}
    </>
  );
}

export default SelectBoundingBoxes;
