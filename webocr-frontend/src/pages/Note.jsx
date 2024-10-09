import styled from "styled-components";
import { Fragment, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import chroma from "chroma-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email({ message: "Niepoprawny adres email" }),
  permissions: z.string(),
});

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "../APIService.js";

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
import { useLocation, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

function Note() {
  const location = useLocation();

  const folderName = location.state?.folderName;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isViewMode, setIsVieWMode] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      permissions: "",
    },
  });
  const OptionWithTooltip = (props) => {
    const { innerProps, innerRef } = props;
    return (
      <div
        className="flex flex-row py-2 px-4 justify-between cursor-pointer"
        ref={innerRef}
        {...innerProps}
      >
        {props.data.label}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPopoverOpen(!isPopoverOpen);
              }}
            >
              Open
            </button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    );
  };
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [exportType, setExportType] = useState("pdf");
  const [currentNote, setCurrentNote] = useState({
    title: "",
    content: "",
    isPrivate: false,
  });
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"]);
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [options, setOptions] = useState([]);
  const [userFolders, setUserFolders] = useState([]);

  const [lastNotes, setLastNotes] = useState([]);

  const colourStyles = {
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
  };
  const [selectedOption, setSelectedOption] = useState([]);
  const [colorSelectOpen, setColorSelectOpen] = useState(false);

  const exportNoteHandler = () => {
    api
      .get(`http://localhost:8051/api/user/note/${noteId}/${exportType}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        toast({
          title: "Notatka została wyeksportowana",
          body: "Plik został zapisany na Twoim komputerze",
        });
        window.open(response.data, "_blank", "rel=noopener noreferrer");
        setExportDialogOpen(false);
      });
  };

  const handleNoteHeader = (e) => {
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "";
    } else {
      currentNote.title = e.target.innerText.trim();
      api
        .put(
          `http://localhost:8051/api/user/note/${currentNote.noteId}/update`,
          {
            content: currentNote.content,
            name: currentNote.title,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka zapisana!",
          });
        });

      api
        .get("http://localhost:8051/api/user/folder", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setUserFolders(response.data.items);
        });
    }
  };

  const handleNoteContent = (e) => {
    if (e.target.innerText.trim() === "") {
      currentNote.content = "";
      setPlaceholderVisible(true);
    } else {
      currentNote.content = e.target.innerText.trim();
      api
        .put(
          `http://localhost:8051/api/user/note/${currentNote.noteId}/update`,
          {
            content: currentNote.content,
            name: currentNote.title,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka zapisana!",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [shareType, setShareType] = useState("only-user");

  const handleShareTypeChange = (value) => {
    if (value === "no-share") {
      api
        .get(`http://localhost:8051/api/shared/note/${currentNote.noteId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            api
              .delete(
                `http://localhost:8051/api/shared/note`,
                {
                  objectId: currentNote.noteId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                  },
                }
              )
              .then((response) => {
                toast({
                  title: "Notatka nie jest już udostępniana!",
                });
                setShareDialogOpen(false);
              });
          }
        });
    } else if (value === "all-users") {
      api
        .post(
          `http://localhost:8051/api/shared/note`,
          {
            objectId: currentNote.noteId,
            shareMode: 1,
            email: null,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka została udostępniona",
            body: "Notatka jest dostępna dla wszystkich użytkowników",
          });
        });
    }
    setShareType(value);
  };

  const handleDelete = () => {
    api
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

  const handleContentEdit = () => {
    setPlaceholderVisible(false);
  };

  const handleCreateCategory = (inputValue) => {
    const color = chroma.random().hex();
    if (!isViewMode) {
      api
        .post(
          `http://localhost:8051/api/noteCategories`,
          {
            name: inputValue,
            hexColor: color,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            const newOptions = [...options];
            newOptions.push({
              value: response.data,
              label: inputValue,
              color: color,
            });
            setOptions(newOptions);
            const newSelectedOptions = [...selectedOption];
            newSelectedOptions.push({
              value: response.data,
              label: inputValue,
              color: color,
            });
            setSelectedOption(newSelectedOptions);
          } else if (response.status === 500) {
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
          }
        });
    }
  };

  const handleScanNoteRedirect = () => {
    navigate(`/scan-note/`, { state: { noteId: noteId } });
  };

  const handleShareSubmit = (values) => {
    if (shareType === "no-share") {
      api
        .delete(
          `http://localhost:8051/api/shared/note`,
          {
            objectId: currentNote.noteId,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka nie jest udostępniana",
          });
          setShareDialogOpen(false);
        });
    }

    if (shareType === "only-user" && values.email) {
      api
        .post(
          `http://localhost:8051/api/shared/note`,
          {
            objectId: currentNote.noteId,
            shareMode: parseInt(values.permissions),
            email: values.email,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka została udostępniona",
            body: "Notatka jest dostępna dla innych użytkowników",
          });
          setShareDialogOpen(false);
        })
        .catch((error) => {
          if (error.response.data === "That user doesn't exist.") {
            form.setError("email", {
              type: "custom",
              message: "Użytkownik o podanym adresie e-mail nie istnieje.",
            });
          } else if (
            error.response.data === "Cannot share resource to yourself."
          ) {
            form.setError("email", {
              type: "custom",
              message: "Nie możesz udostępnić notatki samemu sobie!",
            });
          }
        });
    } else if (shareType === "all-users") {
      api
        .post(
          `http://localhost:8051/api/shared/note`,
          {
            objectId: currentNote.noteId,
            shareMode: 1,
            email: "",
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then((response) => {
          toast({
            title: "Notatka została udostępniona",
            body: "Notatka jest dostępna dla wszystkich użytkowników",
          });
          setShareDialogOpen(false);
        });
    }
  };
  useEffect(() => {
    if (noteId) {
      api
        .get(`http://localhost:8051/api/user/note/${noteId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setCurrentNote({
            noteId: response.data.id,
            title: response.data.name,
            content: response.data.content,
            isPrivate: response.data.isPrivate,
          });
          const newCategories = response.data.categories.map((category) => ({
            value: category.id,
            label: category.name,
            color: category.hexColor,
          }));
          setSelectedOption(newCategories);
          if (currentNote.isPrivate) {
            setShareType("only-user");
          } else {
            setShareType("all-users");
          }
        });

      api
        .get(`http://localhost:8051/api/shared/note/${noteId}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          if (response.data.length === 0) {
            setShareType("no-share");
          } else {
            if (response.data[0].shareToEmail !== "") {
              setShareType("only-user");
              form.setValue("email", response.data[0].shareToEmail);
              form.setValue("permissions", response.data[0].mode.toString(), {
                shouldValidate: true,
              });
            } else if (response.data[0].shareToEmail === "") {
              setShareType("all-users");
            }
          }
        })
        .catch((error) => {
          if (error.response.data === "Cannot operate someone else's note.") {
            setIsVieWMode(true);
          }
        });
    }

    api
      .get(`http://localhost:8051/api/noteCategories`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        setOptions(
          response.data.items.map((category) => ({
            value: category.id,
            label: category.name,
            color: category.hexColor,
          }))
        );
      });

    api
      .get("http://localhost:8051/api/user/folder", {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        setUserFolders(response.data.items);
      });
  }, [noteId]);

  const handleCategorySelect = (option) => {
    if(!isViewMode) {
      setSelectedOption(option);
    const categoriesIds = option.map((c) => c.value);
    api
      .put(
        `http://localhost:8051/api/user/note/${currentNote.noteId}/categories`,
        {
          categoriesIds: categoriesIds,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        currentNote.isPrivate = false;
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Toaster />
      <main className="grid grid-cols-[385px_1fr]">
        <Sidebar
          options={options}
          setOptions={setOptions}
          userFolders={userFolders}
          setUserFolders={setUserFolders}
        ></Sidebar>
        <NoteBody className="pl-16 pt-8">
          {currentNote.title && noteId ? (
            <Fragment>
              <div className="notebody__top flex flex-row items-center justify-between mr-16">
                <BreadcrumbPage>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <BreadcrumbFolder>
                          <img src="/folder.png" alt="" />
                          <p>{folderName}</p>
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
                            Wybierz, w jakim formacie zostanie wyeksportowana
                            Twoja notatka.
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

                  {!isViewMode && (
                    <>
                      <Dialog
                        open={shareDialogOpen}
                        onOpenChange={setShareDialogOpen}
                      >
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
                                Zdecyduj, czy Twoja notatka ma być widoczna dla
                                innych.
                              </p>
                              <p className="font-bold text-sm mt-4 mb-2">
                                Rodzaj udostępnienia
                              </p>
                              <Select
                                onValueChange={(value) =>
                                  handleShareTypeChange(value)
                                }
                                defaultValue={shareType}
                              >
                                <SelectTrigger className="w-[320px] py-6 border-slate-400 mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem
                                    className="bg-white focus:bg-slate-200"
                                    value="no-share"
                                  >
                                    <SelectWithIcon className="flex flex-row items-center justify-center gap-5">
                                      <img src="/x-circle.svg" alt="" />
                                      <p className="font-bold">
                                        Bez udostępnienia
                                      </p>
                                    </SelectWithIcon>
                                  </SelectItem>
                                  <SelectItem
                                    className="bg-white focus:bg-slate-200"
                                    value="only-user"
                                  >
                                    <SelectWithIcon className="flex flex-row items-center justify-center gap-5">
                                      <img src="/lock.svg" alt="" />
                                      <p className="font-bold">
                                        Dostęp ograniczony
                                      </p>
                                    </SelectWithIcon>
                                  </SelectItem>
                                  <SelectItem
                                    className="bg-white focus:bg-slate-200"
                                    value="all-users"
                                  >
                                    <SelectWithIcon className="flex flex-row items-center justify-center gap-5">
                                      <img src="/globe.svg" alt="" />
                                      <p className="font-bold">
                                        Dostęp dla każdego
                                      </p>
                                    </SelectWithIcon>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {shareType === "only-user" && (
                                <Form {...form}>
                                  <form
                                    onSubmit={form.handleSubmit(
                                      handleShareSubmit
                                    )}
                                    className="mt-6"
                                  >
                                    <div className="text-inputs grid grid-cols-2 gap-4">
                                      <div className="input-container">
                                        <p className="font-bold text-sm mb-2">
                                          Adres e-mail
                                        </p>
                                        <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => {
                                            return (
                                              <FormItem>
                                                <FormControl>
                                                  <Input
                                                    type="email"
                                                    className="py-6 border-slate-300"
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                            );
                                          }}
                                        />
                                      </div>
                                      <div className="select-container">
                                        <p className="font-bold text-sm mb-2">
                                          Zakres udostępnienia
                                        </p>
                                        <FormField
                                          control={form.control}
                                          name="permissions"
                                          render={({ field }) => {
                                            return (
                                              <FormItem>
                                                <FormControl>
                                                  <Select
                                                    onValueChange={
                                                      field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                  >
                                                    <SelectTrigger className="border-slate-400 mb-8 py-6">
                                                      <SelectValue placeholder="Wybierz zakres uprawnień" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                      <SelectItem
                                                        className="bg-white focus:bg-slate-200"
                                                        value="1"
                                                      >
                                                        Przeglądający
                                                      </SelectItem>
                                                      <SelectItem
                                                        className="bg-white focus:bg-slate-200"
                                                        value="2"
                                                      >
                                                        Edytor
                                                      </SelectItem>
                                                    </SelectContent>
                                                  </Select>
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <DialogButton type="submit">
                                      Udostępnij
                                    </DialogButton>
                                  </form>
                                </Form>
                              )}
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
                    </>
                  )}
                </div>
              </div>
              <div className="notebody__text mt-8">
                <NoteHeader
                  className="font-bold text-4xl"
                  contentEditable={!isViewMode}
                  spellCheck="false"
                  placeholder="Nowa notatka"
                  onBlur={handleNoteHeader}
                  suppressContentEditableWarning={true}
                >
                  {currentNote.title}
                </NoteHeader>
                <div className="mt-4">
                  <p className="font-bold text-sm text-slate-500">Kategorie</p>

                  <CreatableSelect
                    className="w-2/3 mt-4"
                    isMulti
                    defaultValue={selectedOption}
                    onChange={(e) => handleCategorySelect(e)}
                    options={options}
                    noOptionsMessage={() => "Brak dostępnych kategorii"}
                    formatCreateLabel={(inputValue) =>
                      `Utwórz kategorię "${inputValue}"`
                    }
                    placeholder="Wybierz kategorię..."
                    onCreateOption={(inputValue) =>
                      handleCreateCategory(inputValue)
                    }
                    maxMenuHeight={512}
                    menuPlacement="auto"
                    value={selectedOption}
                    styles={colourStyles}
                    components={{
                      Option: (props) => (
                        <OptionWithTooltip
                          {...props}
                          isOpen={isPopoverOpen}
                          onOpenChange={setIsPopoverOpen}
                        />
                      ),
                    }}
                  />
                </div>
                <div
                  className="notebody__content focus:outline-none mt-8 mr-16"
                  contentEditable={!isViewMode}
                  suppressContentEditableWarning={true}
                  onBlur={handleNoteContent}
                >
                  {currentNote.content.trim().length === 0 &&
                  placeholderVisible ? (
                    <div
                      className="flex flex-col gap-y-4"
                      contentEditable="false"
                      onClick={handleContentEdit}
                    >
                      <p className="text-sm font-bold text-slate-700 select-none">
                        Zacznij pisać lub
                      </p>
                      <span className="flex flex-row gap-4">
                        <img src="http://localhost:5173/scanicon.png" />
                        <button
                          className="font-bold text-sm text-slate-700"
                          onClick={handleScanNoteRedirect}
                        >
                          Zeskanuj zdjęcie
                        </button>
                      </span>
                    </div>
                  ) : (
                    currentNote.content
                  )}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <NoteHeader className="font-bold text-4xl mt-8 mb-4">
                Cześć! Wybierz swoją notatkę
              </NoteHeader>
              <NoteBody>
                Utwórz swoją notatkę lub wybierz ją z listy po lewej stronie.
                Jeżeli nie masz jeszcze notatek, utwórz folder i dodaj swoje
                pierwsze notatki.
              </NoteBody>
            </Fragment>
          )}
        </NoteBody>
      </main>
    </>
  );
}

export default Note;
