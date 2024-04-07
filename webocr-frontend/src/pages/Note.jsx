import styled from "styled-components";
import  { Fragment, useState } from "react";
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
import axios from "axios";

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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Note() {

  const { noteId } = useParams();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [exportType, setExportType] = useState("pdf");
  const [currentNote, setCurrentNote] = useState({
    noteId: 5,
    title: "Testowy dokument schematyczny",
    content: "",
    isPrivate: false,
  });
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");

  const exportNoteHandler = async () => {
    await axios
      .post(
        "http://localhost:8051/api/note/export",
        {
          noteId: currentNote.id,
          exportType: exportType,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // todo: co z pobieraniem pliku z serwera?
          toast({
            title: "Notatka została wyeksportowana",
            body: "Plik został zapisany na Twoim komputerze",
          });
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        toast({
          title: "Błąd eksportu notatki",
          body: "Nie udało się wyeksportować notatki",
        });
      });
    setExportDialogOpen(false);
  };

  const shareNoteHandler = () => {
    setShareDialogOpen(false);
  };

  const handleNoteHeader = (e) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "";
    }
  };

  const handleNoteContent = (e) => {
    if (e.target.innerText.trim() === "") {
      currentNote.content = "";
      e.currentTarget.innerHTML = `
      <div class="flex flex-col gap-y-4" contentEditable="false">
      <p class="text-sm font-bold text-slate-700 select-none">Zacznij pisać lub </p>
      <span class="flex flex-row gap-4">
        <img src="http://localhost:5173/scanicon.png" />
        <a className="font-bold text-sm text-slate-700" href="/scan-note">Zeskanuj zdjęcie</a>
      </span>
    </div>
      `;
    } else {
      currentNote.content = e.target.innerText.trim();
      axios.put(`/api/user/note/${currentNote.noteId}`, currentNote)
        .then(response => {
          toast({
            title: "Notatka zapisana!",
          })
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const [shareType, setShareType] = useState("only-user");

  const handleShareTypeChange = (value) => {
    if (value === "all-users" && currentNote.isPrivate) {
      axios
        .put(
          `http://localhost:8051/api/user/note/${currentNote.noteId}/update`,
          {
            name: currentNote.title,
            isPrivate: false,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            currentNote.isPrivate = false;
          } else if (response.status === 500) {
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
          }
        });
    } else if (value === "only-user" && !currentNote.isPrivate) {
      axios
        .put(
          `http://localhost:8051/api/user/note/${currentNote.noteId}/update`,
          {
            name: currentNote.title,
            isPrivate: true,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            currentNote.isPrivate = true;
          } else if (response.status === 500) {
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
          }
        });
    }
    setShareType(value);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8051/api/user/note/${currentNote.noteId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast({
            title: "Notatka została usunięta",
            body: "Notatka została usunięta z Twojego konta",
          });
          window.location.href = "/notes";
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      });
  };

  const handleContentEdit = (e) => {
    if (e.currentTarget.innerText.trim().length === 0) {
      e.currentTarget.innerHTML = "";
    } else {
      e.currentTarget.innerHTML = currentNote.content;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8051/api/user/note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCurrentNote({
            noteId: response.data.id,
            title: response.data.name,
            content: response.data.content,
            isPrivate: response.data.isPrivate,
          });
          if (currentNote.isPrivate) {
            setShareType("only-user");
          } else {
            setShareType("all-users");
          }
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      });
  });

  return (
    <>
      <Navbar></Navbar>
      <Toaster />
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
                      <p></p>
                    </BreadcrumbFolder>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentNote.title}</BreadcrumbPage>
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
                      <Select
                        onValueChange={(value) => setExportType(value)}
                      >
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
                      <Select
                        onValueChange={(value) => handleShareTypeChange(value)}
                        defaultValue={shareType}
                      >
                        <SelectTrigger className="w-[320px] py-6 border-slate-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            className="bg-white focus:bg-slate-200"
                            value="only-user"
                          >
                            <SelectWithIcon className="flex flex-row items-center justify-center gap-5">
                              <img src="/lock.svg" alt="" />
                              <p className="font-bold">Tylko dla Ciebie</p>
                            </SelectWithIcon>
                          </SelectItem>
                          <SelectItem
                            className="bg-white focus:bg-slate-200"
                            value="all-users"
                          >
                            <SelectWithIcon className="flex flex-row items-center justify-center gap-5">
                              <img src="/globe.svg" alt="" />
                              <p className="font-bold">Dostęp dla każdego</p>
                            </SelectWithIcon>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {shareType === "all-users" && (
                        <Fragment>
                          <p className="font-bold text-sm mt-6">
                            Link do notatki
                          </p>
                          <div className="share-url-container flex flex-row">
                            <Input
                              type="text"
                              value="https://webocr.pl/r194-ret-testowa"
                              className="mt-4 py-6 w-[300px] border-slate-300"
                              readonly="true"
                            />
                            <button className="mt-4 ml-2 border border-slate-900 inline-flex items-center justify-center h-12 px-3">
                              <img src="/copy.svg" alt="" />
                            </button>
                          </div>
                        </Fragment>
                      )}

                      <DialogButton onClick={shareNoteHandler}>
                        Zamknij
                      </DialogButton>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <button
                className="action flex flex-row gap-2 font-bold text-md hover:bg-neutral-200 items-center p-2 text-red-800"
                onClick={handleDelete}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trash w-6 stroke-red-700"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Usuń
              </button>
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
              {currentNote.title}
            </NoteHeader>
            <div
              className="notebody__content focus:outline-none mt-8 mr-16"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={handleNoteContent}
              onClick={(e) => handleContentEdit(e)}
            >
              {currentNote.content.trim().length === 0 ? (
                <div className="flex flex-col gap-y-4" contentEditable="false">
                  <p className="text-sm font-bold text-slate-700 select-none">
                    Zacznij pisać lub{" "}
                  </p>
                  <span className="flex flex-row gap-4">
                    <img src="http://localhost:5173/scanicon.png" />
                    <a
                      className="font-bold text-sm text-slate-700"
                      href="/scan-note"
                    >
                      Zeskanuj zdjęcie
                    </a>
                  </span>
                </div>
              ) : (
                currentNote.content
              )}
            </div>
          </div>
        </NoteBody>
      </main>
    </>
  );
}

export default Note;
