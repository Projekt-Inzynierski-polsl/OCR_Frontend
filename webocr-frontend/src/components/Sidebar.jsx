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
import axios from "axios";
import Cookies from "js-cookie";
import { TwitterPicker } from "react-color";

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
  height: 100vh;
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

function Sidebar() {
  const [options, setOptions] = useState([
    { value: "przyroda", name: "Notatki", color: "#00B8D9" },
    { value: "matematyka", name: "Matematyka", color: "#0052CC" },
    { value: "fizyka", name: "Fizyka", color: "#5243AA" },
    { value: "chemia", name: "Chemia", color: "#FF5630" },
    { value: "biologia", name: "Biologia", color: "#FF8B00" },
    { value: "angielski", name: "Język angielski", color: "#FFC400" },
  ]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      categoryName: "",
    },
  });

  const handleCategoriesUpdate = async () => {
    const newCategory = {};
    const currentCategory = options.find(
      (option) => option.value === selectedCategory.value
    );

    if (currentCategory.name !== selectedCategory.name) {
      newCategory.name = selectedCategory.name;
    }

    if (currentCategory.color !== selectedCategory.color) {
      newCategory.hexColor = selectedCategory.color;
    }

    await axios
      .put(
        `http://localhost:8051/api/noteCategories/${selectedCategory.value}`,
        newCategory,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setOptions(
            options.map((option) =>
              option.value === selectedCategory.value
                ? selectedCategory
                : option
            )
          );
          setSelectedCategory({});
        } else if (response.status === 500) {
          setErrorMessage("Błąd serwera. Spróbuj ponownie później.");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    if (Cookies.get("authToken")) {
      axios
        .get("http://localhost:8051/api/user/folder", {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          setUserFolders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`http://localhost:8051/api/user/note/lastEdited`, {
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

      axios
        .get(`http://localhost:8051/api/noteCategories`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setOptions(
              response.data.map((category) => ({
                value: category.id,
                name: category.name,
                color: category.hexColor,
              }))
            );
            console.log(response.data);
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

  const [userFolders, setUserFolders] = useState([]);
  const [addNewNoteDialogOpen, setAddNewNoteDialogOpen] = useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [newNoteHeader, setNewNoteHeader] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteFolderId, setNewNoteFolderId] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [lastNotes, setLastNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddFolder = (name) => {
    const folders = [...userFolders];
    axios
      .post(
        "http://localhost:8051/api/user/folder",
        {
          name: name,
          iconPath: "/folder.png",
          password: "",
          confirmedPassword: "",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      )
      .then((response) => {
        folders.push({
          folderId: response.data,
          name: name,
          notesCount: 0,
          notes: [],
          iconPath: "/folder.png",
        });
        setNewFolderName("");
        setUserFolders(folders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editFolderIcon = (folderId, icon) => {
    const folders = [...userFolders];
    const folder = folders.find((folder) => folder.id === folderId);
    folder.iconPath = icon;
    setUserFolders(folders);
  };

  const handleNewNoteHeader = (e) => {
    setNewNoteHeader(e.target.innerText);
    if (e.target.innerText.trim() === "") {
      e.target.innerText = "";
    }
  };

  const handleNewNote = () => {
    if (newNoteHeader.trim() !== "") {
      const folderId = newNoteFolderId;
      const folders = [...userFolders];
      const foundFolder = folders.find((f) => f.id === folderId);
      foundFolder.notes.push({
        id: foundFolder.notes.length + 1,
        name: newNoteHeader,
        url: `/notes/${foundFolder.notes.length + 1}`,
      });
      foundFolder.notesCount = foundFolder.notes.length;

      axios
        .post(
          "http://localhost:8051/api/user/note",
          {
            folderId: folderId,
            name: newNoteHeader,
            content: newNoteContent,
            categoriesIds: [1],
            noteFileId: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("authToken")}`,
            },
          }
        )
        .then(() => {
          setUserFolders(folders);
          setNewNoteContent("");
          setNewNoteHeader("");
        })
        .catch((error) => {
          console.log(error);
          setUserFolders(folders);
          setNewNoteContent("");
          setNewNoteHeader("");
        });
    }
  };

  const handleNoteContent = (e) => {
    if (e.currentTarget.innerText.trim() === "") {
      setNewNoteContent("");
      setPlaceholderVisible(true);
    } else {
      setNewNoteContent(e.currentTarget.innerText.trim());
    }
  };

  const handleContentEdit = () => {
    setPlaceholderVisible(false);
  };

  const handleColorChange = (color) => {
    setSelectedCategory({ ...selectedCategory, color: color.hex });
  };

  const handleRemoveCategory = (category) => {
    const newOptions = options.filter((option) => option.value !== category);
    setOptions(newOptions);
  }

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
                  href={note.url}
                  className="text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  {note.name}
                </a>
              </div>
            ))}
          </div>
          <div className="user-notes-container mt-24">
            <div className="user-notes-header flex flex-row pl-16 items-center justify-between mr-2">
              <h2 className="font-bold text-xl">Kategorie notatek</h2>
            </div>
            <div className="user-notes">
              {options.map((option) => (
                <Fragment key={option.value}>
                  <div className="folder pl-10 mt-2 flex flex-row py-1.5 mx-4 items-center">
                    <span
                      className={`rounded-full h-[12px] w-[12px] mr-[16px]`}
                      style={{ backgroundColor: `${option.color}` }}
                    />
                    <p className="folder__title mr-4">{option.name}</p>
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
                              form.setValue("categoryName", option.name);
                            }}
                          >
                            Edytuj kategorię
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button
                            onClick={() => {
                              handleRemoveCategory(option.value);
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
              <Dialog
                open={editCategoryDialogOpen}
                onOpenChange={() => {
                  setEditCategoryDialogOpen(!editCategoryDialogOpen);
                  if (
                    !form.formState.errors.categoryName &&
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
                    <Form {...form}>
                      <form
                        className="space-y-8"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <p className="font-bold text-red-700 mt-8 text-sm">
                          {form.formState.errors.categoryName?.message}
                        </p>
                        <div className="text-inputs">
                          <div className="input-container">
                            <p className="font-bold text-sm mb-2">
                              Nazwa kategorii
                            </p>
                            <FormField
                              control={form.control}
                              name="categoryName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      className="py-6 border-slate-300 mb-8"
                                      {...field}
                                      {...form.register("categoryName")}
                                      onBlur={() => {
                                        if (
                                          !form.formState.errors.categoryName
                                        ) {
                                          setSelectedCategory({
                                            ...selectedCategory,
                                            name: form.getValues(
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
                          !form.formState.errors.categoryName &&
                          editCategoryDialogOpen
                        ) {
                          handleCategoriesUpdate();
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
            <div className="user-notes">
              {userFolders.map((folder) => (
                <Fragment key={folder.id}>
                  <Collapsible>
                    <div className="folder pl-10 mt-2 flex flex-row hover:bg-slate-200 py-1.5 mx-4 items-center">
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
                      <p className="folder__title mr-4">{folder.name}</p>
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
                    </div>
                    <CollapsibleContent>
                      <div className="folder__notes pl-6">
                        {folder.notes.map((note) => (
                          <NavLink
                            key={note.id}
                            to={note.url}
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
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Fragment>
              ))}
              <Dialog
                open={addNewNoteDialogOpen}
                modal
                defaultOpen={addNewNoteDialogOpen}
              >
                <DialogContent
                  className="bg-white p-8 max-w-[1560px] min-h-[768px]"
                  onInteractOutside={() => {
                    setAddNewNoteDialogOpen(false);
                    handleNewNote();
                  }}
                >
                  <DialogHeader>
                    <DialogDescription>
                      <NoteBody>
                        <div className="notebody__text mt-8">
                          <NoteHeader
                            className="font-bold text-4xl"
                            contentEditable="true"
                            spellCheck="false"
                            placeholder="Nowa notatka"
                            onBlur={handleNewNoteHeader}
                            suppressContentEditableWarning={true}
                          >
                            {newNoteHeader}
                          </NoteHeader>

                          <div
                            className="notebody__content focus:outline-none mt-8 mr-16"
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            onBlur={handleNoteContent}
                          >
                            {newNoteContent.trim().length === 0 &&
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
                                  <a
                                    className="font-bold text-sm text-slate-700"
                                    href="/scan-note"
                                  >
                                    Zeskanuj zdjęcie
                                  </a>
                                </span>
                              </div>
                            ) : (
                              newNoteContent
                            )}
                          </div>
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
