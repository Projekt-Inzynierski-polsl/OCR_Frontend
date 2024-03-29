import styled from "styled-components";
import React, { Fragment, useState } from "react";
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

import { Input } from "@/components/ui/input";

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

function Sidebar() {
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

  const [userFolders, setUserFolders] = useState([
    {
      id: 1,
      name: "Przyroda",
      notesCount: 4,
      notes: [
        {
          name: "Notatka 1",
          content: "Treść notatki 1",
          url: "/note",
        },
        {
          name: "Notatka 2",
          content: "Treść notatki 2",
          url: "/note-2",
        },
        {
          name: "Notatka 3",
          content: "Treść notatki 3",
          url: "/note-3",
        },
      ],
      icon: "/folder.png",
    },
    {
      id: 2,
      name: "Matematyka",
      notesCount: 4,
      notes: [
        {
          name: "Notatka 1",
          content: "Treść notatki 1",
          url: "/note-2",
        },
      ],
      icon: "/folder.png",
    },
    {
      id: 3,
      name: "Informatyka",
      notesCount: 4,
      notes: [
        {
          name: "Notatka 1",
          content: "Treść notatki 1",
          url: "/note-3",
        },
      ],
      icon: "/folder.png",
    },
  ]);

  const handleAddFolder = (name) => {
    const folders = [...userFolders];
    folders.push({
      id: folders.length + 1,
      name: name,
      notesCount: 0,
      notes: [],
      icon: "/folder.png",
    });
    setNewFolderName("");
    setUserFolders(folders);
  };

  const editFolderIcon = (folderId, icon) => {
    const folders = [...userFolders];
    const folder = folders.find((folder) => folder.id === folderId);
    folder.icon = icon;
    setUserFolders(folders);
    setChangeIconPopoverOpen(false);
  };

  return (
    <>
      <aside>
        <SidebarBody>
          <h2 className="font-bold text-xl pl-16">Ostatnie dokumenty</h2>
          <div className="last-docs-container flex flex-col mt-2">
            <div className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
              <img src="/note.png" alt="" />
              <a
                href=""
                className="text-ellipsis overflow-hidden whitespace-nowrap"
              >
                testowy tekst który z pewnością jest bardzo długi
              </a>
            </div>
            <div className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
              <img src="/note.png" alt="" />
              <a
                href=""
                className="text-ellipsis overflow-hidden whitespace-nowrap text-md"
              >
                jeszcze dłuższy testowy tekst o niczym
              </a>
            </div>
            <div className="last-doc flex flex-row gap-2 items-center hover:bg-slate-200 py-1.5 pl-12 pr-10 mx-4">
              <img src="/note.png" alt="" />
              <a
                href=""
                className="text-ellipsis overflow-hidden whitespace-nowrap"
              >
                bardzo długi testowy tekst do sprawdzenia
              </a>
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
                                  <img src={folder.icon} alt="" />
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
                        {folder.notesCount}
                      </FolderHint>
                    </div>
                    <CollapsibleContent>
                      <div className="folder__notes pl-6">
                        {folder.notes.map((note) => (
                          <NavLink
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
            </div>
          </div>
        </SidebarBody>
      </aside>
    </>
  );
}

export default Sidebar;
