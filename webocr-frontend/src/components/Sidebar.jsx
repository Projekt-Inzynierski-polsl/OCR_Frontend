import styled from "styled-components";
import React, { Fragment, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [userFolders, setUserFolders] = useState([
    {
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
    },
    {
      name: "Matematyka",
      notesCount: 4,
      notes: [
        {
          name: "Notatka 1",
          content: "Treść notatki 1",
          url: "/note-2",
        },
      ],
    },
    {
      name: "Informatyka",
      notesCount: 4,
      notes: [
        {
          name: "Notatka 1",
          content: "Treść notatki 1",
          url: "/note-3",
        },
      ],
    },
  ]);

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
                    <button className="p-2 hover:bg-neutral-200 mr-1">
                      <img src="/plus.svg" alt="" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stwórz nowy folder</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="user-notes">
              {userFolders.map((folder) => (
                <Fragment key={folder.name}>
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
                          <TooltipTrigger>
                            <button className="p-2 hover:bg-neutral-200 mr-1">
                              <img src="/folder.png" alt="" />
                            </button>
                          </TooltipTrigger>
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
