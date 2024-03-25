import styled from "styled-components";
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NoteBody = styled.div`
  font-family: "Space Grotesk";
  [contenteditable][placeholder]:empty:after {
    content: attr(placeholder);
    position: absolute;
    color: #9ca3af;
    background-color: transparent;
  }
`;

const BreadcrumbFolder = styled.span`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: #9ca3af;
  align-items: center;
`;

const NoteHeader = styled.h1`
  outline: none;
  display: block;
  min-height: 1em;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
  max-width: 100%;

  
`;

const DialogButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 48px;
  border-radius: 5px;
  margin-top: 32px;
`;

const SelectWithIcon = styled.div`
  font-family: "Space Grotesk";
`;


function Note() {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const exportNoteHandler = () => {
    setExportDialogOpen(false);
    console.log("test");
  };

  const shareNoteHandler = () => {
    setShareDialogOpen(false);
    console.log("test");
  };

  const handleNoteHeader = (e) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "";
    }
  }


  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar></Sidebar>
        <NoteBody className="pl-16 pt-8">
          <div className="notebody__top flex flex-row items-center justify-between mr-16">
            <BreadcrumbPage>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <BreadcrumbFolder>
                      <img src="/folder.png" alt="" />
                      <p>Przyroda</p>
                    </BreadcrumbFolder>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Testowy dokument o mitochondriach
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </BreadcrumbPage>
            <div className="actions flex flex-row gap-4">
              <Dialog
                open={exportDialogOpen}
                onOpenChange={setExportDialogOpen}
              >
                <DialogTrigger asChild>
                  <button className="action flex flex-row gap-2 font-bold text-md hover:bg-neutral-200 p-3 items-center">
                    <img src="/download.png" alt="" />
                    Eksportuj
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Eksportuj notatkę
                    </DialogTitle>
                    <DialogDescription>
                      <p className="mb-6">
                        Wybierz, w jakim formacie zostanie wyeksportowana Twoja
                        notatka.
                      </p>
                      <Select>
                        <SelectTrigger className="w-[180px] border-slate-400">
                          <SelectValue placeholder="Wybierz typ pliku" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            className="bg-white focus:bg-slate-200"
                            value="pdf"
                          >
                            PDF
                          </SelectItem>
                          <SelectItem
                            className="bg-white focus:bg-slate-200"
                            value="docx"
                          >
                            DOCX
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <DialogButton onClick={exportNoteHandler}>
                        Eksportuj
                      </DialogButton>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogTrigger asChild>
                  <button className="action flex flex-row gap-2 font-bold text-md hover:bg-neutral-200 items-center p-2">
                    <img src="/share.png" alt="" />
                    Udostępnij
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      Udostępnij notatkę
                    </DialogTitle>
                    <DialogDescription>
                      <p className="mb-6">
                        Zdecyduj, czy Twoja notatka ma być widoczna dla innych.
                      </p>
                      <Select>
                        <SelectTrigger className="w-[320px] py-6 border-slate-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            className="bg-white focus:bg-slate-200"
                            value="pdf"
                          >
                            <SelectWithIcon className="flex flex-row gap-5">
                              <img src="/lock.svg" alt="" />
                              <p className="font-bold">Tylko dla Ciebie</p>
                            </SelectWithIcon>
                          </SelectItem>
                          <SelectItem>
                            <SelectWithIcon className="flex flex-row gap-5">
                              <img src="/globe.svg" alt="" />
                              <p className="font-bold">Dostęp dla każdego</p>
                            </SelectWithIcon>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="font-bold text-sm mt-6">Link do notatki</p>
                      <div className="share-url-container flex flex-row">
                        
                      <Input
                        type="text"
                        placeholder="https://webocr.pl/r194-ret-testowa"
                        className="mt-4 py-6 w-[300px] border-slate-300"
                        readonly="true"
                      />
                      <button className="mt-4 ml-2 border border-slate-900 inline-flex items-center justify-center h-12 px-3">
                        <img src="/copy.svg" alt="" />
                      </button>
                      </div>
                      <DialogButton onClick={shareNoteHandler}>
                        Zamknij
                      </DialogButton>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="notebody__text mt-8">
            <NoteHeader
              className="font-bold text-4xl"
              contentEditable="true"
              spellCheck="false"
              placeholder="Nowa notatka"
              onBlur={handleNoteHeader}
              suppressContentEditableWarning={true}
            >
              Testowy dokument o mitochodnirach
            </NoteHeader>
            <div
              className="notebody__content focus:outline-none mt-8 mr-16"
              contentEditable="true"
              suppressContentEditableWarning={true}
            >
              Mitochondria, znane jako odgrywają kluczową rolę w energetyce
              komórkowej. W kontekście śląskiego węgla kamiennego, organelle te
              stają się centralnym elementem fascynującej historii losowości i
              determinizmu, splatającej się z geopolityką, technologią i
              ludzkimi dziejami. Zagłębie Górnośląskie, bogate w złoża węgla
              kamiennego, kształtowało losy regionu od wieków. Eksploatacja
              rozpoczęła się na dużą skalę w XIX wieku, napędzając
              industrializację i urbanizację. Wraz z wydobyciem węgla wydobywano
              również skały płonne, zawierające mitochondria. W dwudziestoleciu
              międzywojennym nastąpił rozkwit badań nad mitochondriami. Naukowcy
              z różnych krajów, w tym ze Śląska, odkrywali ich strukturę,
              funkcje i znaczenie dla życia. Jednakże, niepewność polityczna i
              nadchodząca wojna przerwały te pionierskie badania. Podczas II
              wojny światowej Górny Śląsk znalazł się pod okupacją niemiecką.
              Górnictwo kontynuowano, ale w sposób rabunkowy, bez dbałości o
              środowisko i ludzi. Badania naukowe zostały wstrzymane, a wiele
              cennych materiałów badawczych uległo zniszczeniu. Po zakończeniu
              wojny Górny Śląsk znalazł się w granicach Polski Ludowej. Nowe
              władze stawiały na odbudowę przemysłu i intensyfikację wydobycia
              węgla. Wznowiono również badania naukowe, w tym nad
              mitochondriami. Jednakże, centralnie planowana gospodarka i
              ograniczenia technologiczne hamowały postęp. Mitochondria w
              śląskim węglu kamiennym podlegały losowemu rozkładowi. Ich ilość i
              rozmieszczenie zależało od wielu czynników, takich jak geologia
              złoża, sposób wydobycia i przeróbki węgla. Determinizm odgrywał
              również rolę, ponieważ geny mitochondriów determinowały ich
              funkcje i cechy.
            </div>
          </div>
        </NoteBody>
      </main>
    </>
  );
}

export default Note;
