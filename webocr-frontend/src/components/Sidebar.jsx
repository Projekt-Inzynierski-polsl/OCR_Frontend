import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { TwitterPicker } from "react-color";
import api from "../APIService.js";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SidebarBody = styled.div`
  background-color: #f3f4f6;
  color: #374151;
  height: 100%;
  padding-bottom: 48px;
  padding-top: 64px;
  font-family: "Space Grotesk";
`;

const FolderHint = styled.p`
  color: #9ca3af;
`;

const PopoverHeader = styled.p`
  font-family: "Space Grotesk";
`;
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    categoryName: z
      .string()
      .min(1, { message: "Nazwa kategorii jest wymagana" }),
  })
  .required();

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavLink } from "react-router-dom";

const DialogButton = styled.button`
  background-color: #004423;
  color: #e9f7ee;
  font-family: "Space Grotesk";
  font-weight: bold;
  padding: 12px 48px;
  border-radius: 5px;
  margin-top: 32px;
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

const NoteBody = styled.div`
  font-family: "Space Grotesk";
  [contenteditable][placeholder]:empty:after {
    content: attr(placeholder);
    position: absolute;
    color: #9ca3af;
    background-color: transparent;
  }
`;

function Sidebar({ options, setOptions, userFolders, setUserFolders }) {
  const editCategoryForm = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      categoryName: "",
    },
  });
  const navigate = useNavigate();
  const editDirectoryForm = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      directoryName: "",
    },
  });

  const handleCategoriesUpdate = async () => {
    await api
      .put(
        `http://localhost:8051/api/noteCategories/${selectedCategory.value}`,
        {
          name: selectedCategory.name,
          hexColor: selectedCategory.color,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        const opt = options.find(
          (option) => option.value === selectedCategory.value
        ).name;
        setOptions(
          options.map((option) =>
            option.value === selectedCategory.value
              ? {
                  value: selectedCategory.value,
                  label: selectedCategory.name,
                  color: selectedCategory.color,
                }
              : option
          )
        );
        setSelectedCategory({});
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const handleDirectoryUpdate = async () => {
    await api
      .put(
        `http://localhost:8051/api/user/folder/${selectedDirectory.id}/update`,
        {
          name: selectedDirectory.name,
          passwordToFolder: "",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        setUserFolders(
          userFolders.map((dir) =>
            dir.id === selectedDirectory.id ? selectedDirectory : dir
          )
        );
        setSelectedDirectory({});
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };
  const handleScanNoteRedirect = () => {
    const title = newNoteHeader === "" ? "Nowa notatka" : newNoteHeader;
    navigate(`/scan-note/`, {
      state: { folderId: newNoteFolderId, title: title },
    });
  };

  useEffect(() => {
    if (Cookies.get("authToken")) {
      api
        .get("http://localhost:8051/api/user/folder", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setUserFolders(response.data.items);
        })
        .catch((error) => {
          console.error(error);
        });

      api
        .get(`http://localhost:8051/api/user/note/lastEdited`, {
          params: {
            amount: 3
          },
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setLastNotes(response.data);
          } else if (response.status === 500) {
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
          }
        });

      api
        .get(`http://localhost:8051/api/shared/notes`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setSharedNotes(response.data);
          } else if (response.status === 500) {
            setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
          }
        });
    }
  }, []);

  const [newFolderName, setNewFolderName] = useState("");
  const [addNewFolderDialogOpen, setAddNewFolderDialogOpen] = useState(false);
  const [availableIcons, setAvailableIcons] = useState([
    {
      id: 1,
      src: "/home.png",
    },
    {
      id: 2,
      src: "/home_active.png",
    },
    {
      id: 3,
      src: "/folder.png",
    },
  ]);

  const [addNewNoteDialogOpen, setAddNewNoteDialogOpen] = useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [newNoteHeader, setNewNoteHeader] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteFolderId, setNewNoteFolderId] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [lastNotes, setLastNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [editDirectoryDialogOpen, setEditDirectoryDialogOpen] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState("");

  const handleAddFolder = (name) => {
    const folders = [...userFolders];
    api
      .post(
        "http://localhost:8051/api/user/folder",
        {
          name: name,
          iconPath: "/folder.png",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
      
        folders.push({
          id: response.data,
          name: name,
          notesCount: 0,
          notes: [],
          iconPath: "/folder.png",
        });
        setNewFolderName("");
        setUserFolders(folders);
      })
  };

  const editFolderIcon = (folderId, icon) => {
    api
      .put(
        `http://localhost:8051/api/user/folder/${folderId}/update`,
        {
          iconPath: icon,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then(() => {
        const folders = [...userFolders];
        const folder = folders.find((folder) => folder.id === folderId);
        folder.iconPath = icon;
        setUserFolders(folders);
      });
  };

  const handleNewNoteHeader = (e) => {
    setNewNoteHeader(e.target.innerText);
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "";
    }
  };


  const handleColorChange = (color) => {
    setSelectedCategory({ ...selectedCategory, color: color.hex });
  };

  const handleRemoveCategory = (category) => {
    api
      .delete(`http://localhost:8051/api/noteCategories/${category.value}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        const newOptions = options.filter(
          (option) => option.value !== category.value
        );
        setOptions(newOptions);
        toast.success(`Usunięto kategorię ${category.label}`);
      });
  };

  const handleRemoveDirectory = async (directory) => {
    await api
      .delete(`http://localhost:8051/api/user/folder/${directory.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      })
      .then((response) => {
        const newDirectories = userFolders.filter(
          (dir) => dir.id !== directory.id
        );
        setUserFolders(newDirectories);
        toast.success(`Usunięto folder ${directory.name}`);
      });
  };

  return (
    <>
      <aside>
        <SidebarBody>
          <h2 className="font-bold text-xl pl-16">Ostatnie dokumenty</h2>
          <div className="last-docs-container flex flex-col mt-2">
            {lastNotes.map((note) => (
              <div
                key={note.id}
                className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4"
              >
                <img src="/note.png" alt="" />
                <a
                  href={`/notes/${note.id}`}
                  className="text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {note.name}
                </a>
              </div>
            ))}

            {lastNotes.length === 0 && (
                      <Fragment className="ml-4">
                        <p className="ml-16 text-gray-400">Edytuj swój pierwszy dokument!</p>
                      </Fragment>
                )}
          </div>
          <h2 className="font-bold text-xl pl-16 mt-16">Udostępnione dokumenty</h2>
          <div className="last-docs-container flex flex-col mt-2">
            {sharedNotes.map((note) => (
              <div
                key={note.note.id}
                className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4"
              >
                <img src="/note.png" alt="" />
                <a
                  href={`/notes/${note.note.id}`}
                  className="text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {note.note.name}
                </a>
              </div>
            ))}

            {sharedNotes.length === 0 && (
                      <Fragment className="ml-4">
                        <p className="ml-16 text-gray-400">Nie masz żadnych udostępnionych dokumentów dla Ciebie.</p>
                      </Fragment>
                )}
          </div>
          
          <div className="user-notes-container mt-24">
            <div className="user-notes-header flex flex-row pl-16 items-center justify-between mr-2">
              <h2 className="font-bold text-xl">Kategorie notatek</h2>
            </div>
            <div className="user-notes mt-8 max-h-[350px] overflow-y-scroll">
              {options.map((option) => (
                <Fragment key={option.value}>
                  <div className="folder pl-10 mt-2 flex flex-row py-1.5 mx-4 items-center">
                    <span
                      className={`rounded-full h-[12px] w-[12px] mr-[16px]`}
                      style={{ backgroundColor: `${option.color}` }}
                    />
                    <p className="folder__title mr-4">{option.label}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button className="p-2 hover:bg-neutral-200 mr-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-more-horizontal"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem>
                          <button
                            onClick={() => {
                              setEditCategoryDialogOpen(true);
                              setSelectedCategory(option);
                              editCategoryForm.setValue(
                                "categoryName",
                                option.label
                              );
                            }}
                          >
                            Edytuj kategorię
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => {
                              handleRemoveCategory(option);
                            }}
                          >
                            Usuń kategorię
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Fragment>
              ))}
              {options.length === 0 && (
                      <Fragment className="ml-4">
                        <p className="ml-16 text-gray-400">Dodaj swoją pierwszą kategorię w notatce!</p>
                      </Fragment>
                )}
              <Dialog
                open={editCategoryDialogOpen}
                onOpenChange={() => {
                  setEditCategoryDialogOpen(!editCategoryDialogOpen);
                  if (
                    !editCategoryForm.formState.errors.categoryName &&
                    editCategoryDialogOpen
                  ) {
                    handleCategoriesUpdate();
                  }
                }}
              >
                <DialogContent className="bg-white p-8">
                  <DialogHeader>
                    <DialogTitle className="text-xl mb-2">
                      Edytuj ustawienia kategorii {selectedCategory.name}
                    </DialogTitle>
                    <DialogDescription>
                      W tym miejscu możesz ustawić inny kolor kategorii lub
                      zmienić jej nazwę.
                    </DialogDescription>
                    <Form {...editCategoryForm}>
                      <form
                        className="space-y-8"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <p className="font-bold text-red-700 mt-8 text-sm">
                          {
                            editCategoryForm.formState.errors.categoryName
                              ?.message
                          }
                        </p>
                        <div className="text-inputs">
                          <div className="input-container">
                            <p className="font-bold text-sm mb-2">
                              Nazwa kategorii
                            </p>
                            <FormField
                              control={editCategoryForm.control}
                              name="categoryName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      className="py-6 border-slate-300 mb-8"
                                      {...field}
                                      {...editCategoryForm.register(
                                        "categoryName"
                                      )}
                                      onBlur={() => {
                                        if (
                                          !editCategoryForm.formState.errors
                                            .categoryName
                                        ) {
                                          setSelectedCategory({
                                            ...selectedCategory,
                                            name: editCategoryForm.getValues(
                                              "categoryName"
                                            ),
                                          });
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </Form>
                    <p className="font-bold text-sm mb-2">Kolor kategorii</p>
                    <span
                      className={`rounded-[5px] h-8 w-8`}
                      style={{ backgroundColor: `${selectedCategory.color}` }}
                    />
                    <TwitterPicker
                      color={selectedCategory.color}
                      onChangeComplete={handleColorChange}
                      className="mt-4"
                    />
                    <DialogButton
                      className="mt-4"
                      onClick={() => {
                        setEditCategoryDialogOpen(!editCategoryDialogOpen);
                        if (
                          !editCategoryForm.formState.errors.categoryName &&
                          editCategoryDialogOpen
                        ) {
                          handleCategoriesUpdate();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditCategoryDialogOpen(!editCategoryDialogOpen);
                          if (
                            !editCategoryForm.formState.errors.categoryName &&
                            editCategoryDialogOpen
                          ) {
                            handleCategoriesUpdate();
                          }
                        }
                      }}
                    >
                      Zapisz zmiany
                    </DialogButton>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog
                open={editDirectoryDialogOpen}
                onOpenChange={() => {
                  setEditDirectoryDialogOpen(!editDirectoryDialogOpen);
                  if (
                    !editDirectoryForm.formState.errors.directoryName &&
                    editDirectoryDialogOpen
                  ) {
                    handleDirectoryUpdate();
                  }
                }}
              >
                <DialogContent className="bg-white p-8">
                  <DialogHeader>
                    <DialogTitle className="text-xl mb-2">
                      Edytuj folder {selectedDirectory.name}
                    </DialogTitle>
                    <DialogDescription>
                      W tym miejscu możesz ustawić nową nazwę dla wybranego przez Ciebie katalogu.
                    </DialogDescription>
                    <Form {...editDirectoryForm}>
                      <form
                        className="space-y-8"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <p className="font-bold text-red-700 mt-8 text-sm">
                          {
                            editDirectoryForm.formState.errors.categoryName
                              ?.message
                          }
                        </p>
                        <div className="text-inputs">
                          <div className="input-container">
                            <p className="font-bold text-sm mb-2">
                              Nazwa folderu
                            </p>
                            <FormField
                              control={editDirectoryForm.control}
                              name="categoryName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      className="py-6 border-slate-300 mb-8"
                                      {...field}
                                      {...editDirectoryForm.register(
                                        "directoryName"
                                      )}
                                      onBlur={() => {
                                        if (
                                          !editDirectoryForm.formState.errors
                                            .categoryName
                                        ) {
                                          setSelectedDirectory({
                                            ...selectedDirectory,
                                            name: editDirectoryForm.getValues(
                                              "directoryName"
                                            ),
                                          });
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </form>
                    </Form>
                    <DialogButton
                      className="mt-4"
                      onClick={() => {
                        setEditDirectoryDialogOpen(!editDirectoryDialogOpen);
                        if (
                          !editDirectoryForm.formState.errors.categoryName &&
                          editDirectoryDialogOpen
                        ) {
                          handleDirectoryUpdate();
                        }
                      }}
                    >
                      Zapisz zmiany
                    </DialogButton>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="user-notes-container mt-24">
            <div className="user-notes-header flex flex-row pl-16 items-center justify-between mr-2">
              <h2 className="font-bold text-xl">Twoja przestrzeń</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Dialog
                      open={addNewFolderDialogOpen}
                      onOpenChange={setAddNewFolderDialogOpen}
                      modal
                      defaultOpen={addNewFolderDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <button className="p-2 hover:bg-neutral-200 mr-1">
                          <img src="/plus.svg" alt="" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-white p-8 max-w-[720px]">
                        <DialogHeader>
                          <DialogTitle className="text-xl mb-2">
                            Podaj nazwę nowego folderu
                          </DialogTitle>
                          <DialogDescription>
                            <Input
                              type="text"
                              placeholder="Nowy folder"
                              className="mt-4 py-6 w-[300px] border-slate-300"
                              onChange={(e) => setNewFolderName(e.target.value)}
                            />
                            <DialogButton
                              className="mt-2"
                              onClick={() => {
                                handleAddFolder(newFolderName);
                                setAddNewFolderDialogOpen(false);
                              }}
                            >
                              Dodaj
                            </DialogButton>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stwórz nowy folder</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="user-notes max-h-[512px] overflow-y-scroll">
              {userFolders.map((folder) => (
                <Fragment key={folder.id}>
                  <Collapsible>
                    <div className="folder pl-4 mt-2 grid grid-cols-[20px_64px_1fr_64px_48px_32px] lg:grid-cols-[20px_64px_110px_64px_48px_32px] hover:bg-slate-200 py-1.5 mx-4 items-center">
                      <CollapsibleTrigger>
                        <button
                          className="p-2 hover:bg-neutral-300 rounded-md"
                          onClick={(e) =>
                            e.target.classList.toggle("rotate-90")
                          }
                        >
                          <img src="/arr.svg" alt="" />
                        </button>
                      </CollapsibleTrigger>

                      <TooltipProvider>
                        <Tooltip>
                          <Popover>
                            <TooltipTrigger>
                              <PopoverTrigger>
                                <button className="p-2 hover:bg-neutral-200 mr-1">
                                  <img src={folder.iconPath} alt="" />
                                </button>
                              </PopoverTrigger>
                            </TooltipTrigger>
                            <PopoverContent className="bg-slate-200 p-4">
                              <PopoverHeader className="font-bold">
                                Wybierz ikonę folderu
                              </PopoverHeader>
                              <div className="grid grid-cols-4 gap-2 mt-4">
                                {availableIcons.map((icon) => (
                                  <>
                                    <PopoverClose>
                                      <button
                                        className="p-2 hover:bg-neutral-200 mr-1 inline-flex items-center justify-center"
                                        onClick={() =>
                                          editFolderIcon(folder.id, icon.src)
                                        }
                                      >
                                        <img src={icon.src} alt="" />
                                      </button>
                                    </PopoverClose>
                                  </>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                          <TooltipContent>
                            <p>Zmień ikonę folderu</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <p className="folder__title mr-4 text-elipsis">
                        {folder.name}
                      </p>
                      <FolderHint className="mr-24 text-sm">
                        {folder.notes.length}
                      </FolderHint>
                      <button
                        className="p-2 hover:bg-neutral-200 mr-1"
                        onClick={() => {
                          setNewNoteFolderId(folder.id);
                          setAddNewNoteDialogOpen(!addNewNoteDialogOpen);
                        }}
                      >
                        <img src="/plus.svg" alt="" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <button className="p-2 hover:bg-neutral-200 mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-more-horizontal"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="19" cy="12" r="1"></circle>
                              <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                setEditDirectoryDialogOpen(true);
                                setSelectedDirectory(folder);
                                editDirectoryForm.setValue(
                                  "directoryName",
                                  folder.name
                                );
                              }}
                            >
                              Edytuj folder
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleRemoveDirectory(folder);
                              }}
                            >
                              Usuń folder
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CollapsibleContent>
                      <div className="folder__notes pl-6">
                        {folder.notes.map((note) => {
                          return (
                            <NavLink
                              key={note.id}
                              to={`/notes/${note.id}`}
                              state={{
                                folderName: folder.name,
                              }}
                              style={({ isActive }) => {
                                return {
                                  backgroundColor: isActive
                                    ? "#f3f4f6"
                                    : "transparent",
                                  fontWeight: isActive ? "bold" : "normal",
                                };
                              }}
                            >
                              {({ isActive }) => {
                                return isActive ? (
                                  <div
                                    className={`folder-doc bg-slate-200 flex flex-row gap-2 items-center py-1.5 pl-12 pr-10 mx-4`}
                                  >
                                    <img src="/note.png" alt="" />
                                    {note.name}
                                  </div>
                                ) : (
                                  <div
                                    className={`folder-doc doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4`}
                                  >
                                    <img src="/note.png" alt="" />
                                    {note.name}
                                  </div>
                                );
                              }}
                            </NavLink>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Fragment>
              ))}
              {userFolders.length === 0 && (
                      <Fragment className="ml-4">
                        <p className="ml-16 mt-2 text-gray-400">Dodaj swój pierwszy folder!</p>
                      </Fragment>
                )}
              <Dialog
                open={addNewNoteDialogOpen}
                onOpenChange={() => {
                  setNewNoteHeader("");
                  setAddNewNoteDialogOpen(!addNewNoteDialogOpen);
                }}
                modal
                defaultOpen={addNewNoteDialogOpen}
              >
                <DialogContent
                  className="bg-white p-8 max-w-[1560px] min-h-[768px]"
                  onInteractOutside={() => {
                    setAddNewNoteDialogOpen(false);
                    setNewNoteHeader("");
                  }}
                >
                  <DialogHeader>
                    <DialogDescription>
                      <NoteBody>
                        <div className="notebody__text mt-8">
                          <NoteHeader
                            className="font-bold text-4xl text-left"
                            contentEditable="true"
                            spellCheck="false"
                            placeholder="Nowa notatka"
                            onBlur={handleNewNoteHeader}
                            suppressContentEditableWarning={true}
                          >
                            {newNoteHeader}
                          </NoteHeader>

                          <span className="flex flex-row gap-4 mt-8">
                            <img src="http://localhost:5173/scanicon.png" />
                            <button
                              className="font-bold text-sm text-slate-700"
                              onClick={handleScanNoteRedirect}
                            >
                              Zeskanuj zdjęcie
                            </button>
                          </span>
                        </div>
                      </NoteBody>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </SidebarBody>
      </aside>
    </>
  );
}

export default Sidebar;
